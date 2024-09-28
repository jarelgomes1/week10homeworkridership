// Map Specification
const mapSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 800,
    "height": 600,
    "data": [
        {
            "name": "mapData",
            "url": "visualizations/mapVisualization.json", // URL to your JSON file
            "format": {
                "type": "json"
            }
        }
    ],
    // Additional properties and data as needed
    "marks": [
        {
            "type": "shape",
            "from": {"data": "mapData"},
            "encode": {
                "enter": {
                    "fill": {"value": "#e0f3db"},
                    "stroke": {"value": "#3182bd"}
                }
            },
            "transform": [
                {"type": "geoshape", "projection": "mercator"}
            ]
        }
    ],
    "projections": [
        {
            "name": "mercator",
            "type": "mercator",
            "scale": 150,
            "translate": [{"signal": "width / 2"}, {"signal": "height / 2"}]
        }
    ]
};

// Line Chart Specification
const lineChartSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple line chart.",
    "data": {
        "values": [] // This will be dynamically updated based on map interaction
    },
    "mark": "line",
    "encoding": {
        "x": {"field": "Time", "type": "ordinal"},
        "y": {"field": "Value", "type": "quantitative"}
    }
};

// Embed the map visualization
vegaEmbed('#mapVis', mapSpec, {mode: "vega"}).then(response => {
    const view = response.view;
    
    // Assume your countries have an identifiable field like 'id' or 'name'
    view.addEventListener('click', function(event, item) {
        if (item && item.datum && item.datum.name) {
            updateLineChart(item.datum.name);
        }
    });
}).catch(console.error);

// Function to update the line chart based on the country selected
function updateLineChart(countryName) {
    // Fetch new data or filter existing dataset based on the countryName
    const newData = fetchDataForCountry(countryName); // This function needs to be implemented

    // Update line chart spec data
    lineChartSpec.data.values = newData;

    // Re-embed the updated line chart
    vegaEmbed('#lineChartVis', lineChartSpec, {mode: "vega-lite"}).catch(console.error);
}

// Mock function to simulate fetching data
function fetchDataForCountry(countryName) {
    // This should actually fetch or compute data based on `countryName`
    return [
        {Time: "2020", Value: Math.random() * 100},
        {Time: "2021", Value: Math.random() * 100},
        {Time: "2022", Value: Math.random() * 100}
    ];
}
