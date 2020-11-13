import * as d3 from "d3";
import { roundTo20 } from "./math";
import { nodeType } from "@/common";

function render(g, node, isSelected) {
  node.width = node.width || 120;
  node.height = node.height || 60;
  let borderColor = isSelected ? "#666" : "#bbb";
  if (node.type !== nodeType.Start && node.type !== nodeType.End) {
    // title
    g.append("rect")
      .attr("x", node.x)
      .attr("y", node.y)
      .attr("stroke", borderColor)
      .attr("class", "title")
      .style("height", "20px")
      .style("fill", "#f5f6f7")
      .style("stroke-width", "1px")
      .style("width", node.width + "px");
    g.append("text")
      .attr("x", node.x + 8)
      .attr("y", node.y + 15)
      .attr("class", "unselectable")
      .style("fill", "#6b6d7a")
      .text(() => "Step")
      .each(function wrap() {
        let self = d3.select(this),
          textLength = self.node().getComputedTextLength(),
          text = self.text();
        while (textLength > node.width - 2 * 4 && text.length > 0) {
          text = text.slice(0, -1);
          self.text(text + "...");
          textLength = self.node().getComputedTextLength();
        }
      });
  }
  // body
  let body = g.append("rect").attr("class", "body");
  body
    .style("width", node.width + "px")
    .style("fill", "white")
    .style("stroke-width", "1px");
  if (node.type !== nodeType.Start && node.type !== nodeType.End) {
    body.attr("x", node.x).attr("y", node.y + 20);
    body.style("height", roundTo20(node.height - 20) + "px");
  } else {
    body
      .attr("x", node.x)
      .attr("y", node.y)
      .classed(node.type, true)
      .attr("rx", 30);
    body.style("height", roundTo20(node.height) + "px");
  }
  body.attr("stroke", borderColor);

  // body text
  let text =
    node.type === nodeType.Start
      ? "Start"
      : node.type === nodeType.End
      ? "End"
      : node.name;
  let bodyTextY;
  if (node.type !== nodeType.Start && node.type !== nodeType.End) {
    bodyTextY = node.y + 25 + roundTo20(node.height - 20) / 2;
  } else {
    bodyTextY = node.y + 5 + roundTo20(node.height) / 2;
  }
  g.append("text")
    .attr("x", node.x + node.width / 2)
    .attr("y", bodyTextY)
    .attr("class", "unselectable")
    .attr("text-anchor", "middle")
    .style("fill", "#3c4b64")
    .text(function() {
      return text;
    })
    .each(function wrap() {
      let self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
      while (textLength > node.width - 2 * 4 && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + "...");
        textLength = self.node().getComputedTextLength();
      }
    });
}

export { render };
