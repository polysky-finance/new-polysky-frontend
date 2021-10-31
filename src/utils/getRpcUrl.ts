// import sample from 'lodash/sample'

// Array of available nodes to connect to
export const nodes = [ process.env.REACT_APP_NODE_4,  process.env.REACT_APP_NODE_5, process.env.REACT_APP_NODE_6, process.env.REACT_APP_NODE_7, process.env.REACT_APP_NODE_8, process.env.REACT_APP_NODE_9, 
  process.env.REACT_APP_NODE_10, process.env.REACT_APP_NODE_11, process.env.REACT_APP_NODE_12, process.env.REACT_APP_NODE_13, process.env.REACT_APP_NODE_14,
  process.env.REACT_APP_NODE_15,process.env.REACT_APP_NODE_16,process.env.REACT_APP_NODE_17]

const getNodeUrl = () => {
  const index = Math.floor(Math.random() * nodes.length)
  return nodes[index] // sample(nodes)
}

export default getNodeUrl
