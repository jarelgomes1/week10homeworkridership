// Map Specification
const mapSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 800,
    "height": 600,
    "data": [
        {
            "name": "mapData",
            "url": "visualizations/map.vg.json",
            "format": {"type": "json"}
        }
    ],
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
            "transform": [{"type": "geoshape", "projection": "mercator"}]
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

// Embed the map visualization
vegaEmbed('#mapVis', mapSpec, {mode: "vega"}).catch(console.error);
