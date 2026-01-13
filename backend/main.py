from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # React default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Returns True if the graph is a DAG (no cycles), False otherwise.
    """
    if not nodes or not edges:
        return True  # Empty graph is a DAG
    
    # Build adjacency list and in-degree count
    node_ids = {node['id'] for node in nodes}
    adjacency = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node in nodes:
        in_degree[node['id']] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        if source in node_ids and target in node_ids:
            adjacency[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm: find nodes with no incoming edges
    queue = deque()
    for node_id in node_ids:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    processed_count = 0
    
    # Process nodes with no incoming edges
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Remove edges from current node
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    # If not, there's a cycle
    return processed_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse the pipeline and return:
    - num_nodes: number of nodes in the pipeline
    - num_edges: number of edges in the pipeline
    - is_dag: whether the pipeline forms a directed acyclic graph
    """
    # Convert Pydantic models to dicts for processing
    nodes = [node.dict() for node in pipeline.nodes]
    edges = [edge.dict() for edge in pipeline.edges]
    
    # Calculate metrics
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if it's a DAG
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
