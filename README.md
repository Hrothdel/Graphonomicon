# The Graphonomicon
A web-based graph visualizer and editor, made using javascript and the jQuery library.

The editor allows modifying graphs by toggling edges in the adjecency matrix or entering in a text box indicies of vertices forming new edges. The app supports undirected graphs, directed graphs and trees, providing conversions between them. The number of nodes and the index of the root node for the tree can be selected, the visualization adapting to the changes.

The state of the graph is serialized in the url, and is deserialized from the url when the page loads, providing a convenient saving and sharing mechanism.

An options screen for the visualizer is included. The graph radius, node radius and font size of the node indicies can be changed, and color options for all the elements of the visualizer are also available.
