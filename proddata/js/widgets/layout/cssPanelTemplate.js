//  Profound UI Runtime  -- A Javascript Framework for Rich Displays
//  Copyright (c) 2020 Profound Logic Software, Inc.
//
//  This file is part of the Profound UI Runtime
//
//  The Profound UI Runtime is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Lesser General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  The Profound UI Runtime is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public License
//  In the COPYING and COPYING.LESSER files included with the Profound UI Runtime.
//  If not, see <http://www.gnu.org/licenses/>.

/**
 * Returns template properties for the layout (when parms.returnProps is true). Or returns a DIV element to contain the widget.
 * @param {Object} parms
 * @returns {Element|Object}
 */
pui.layout.template.cssPanelTemplate = function (parms) {

  var properties = parms.properties;
  var designMode = parms.designMode;
  var proxyMode = parms.proxyMode;
  var returnProps = parms.returnProps;
  var existingDom = parms.dom;

  if (returnProps) {
    return pui.layout.mergeProps([{
        name: "has header",
        choices: ["true", "false"],
        help: pui.helpTextProperties("theme","Determines whether the panel has a header.")
      },
      {
        name: "header height",
        format: "number",
        help: pui.helpTextProperties("theme","Specifies the height of the panel header.")
      },
      {
        name: "header text",
        help: pui.helpTextProperties("placeholder","Specifies the text that will appear in the panel header."),
        translate: true
      },
      {
        name: "header theme",
        choices: ["A - Black", "B - Blue", "C - Gray", "D - Light Gray", "E - Yellow", "F - Green", "G - Red", "Other..."],
        help: pui.helpTextProperties("theme","Specifies the jQuery Mobile theme to use for the panel header. The theme is associated with a set of cascading style sheet rules.", ["other"], "When you enter a custom value, a CSS class is add to the body of the panel in the form of <code>ui-btn-up-YourCustomValue</code>, where YourCustomValue is the exact text that was entered, including special characters, such as ' ', '-', and '_', and regardless of their validity in a CSS class name. This will allow you to customize the styling of the header using that CSS class name.")
      },
      {
        name: "body theme",
        choices: ["A - Black", "B - Blue", "C - Gray", "D - Light Gray", "E - Yellow", "F - Green", "G - Red", "Other..."],
        help: pui.helpTextProperties("theme","Specifies the jQuery Mobile theme to use for the panel body. The theme is associated with a set of cascading style sheet rules.", ["other"], "When you enter a custom value, a CSS class is add to the body of the panel in the form of <code>ui-btn-up-YourCustomValue</code>, where YourCustomValue is the exact text that was entered, including special characters, such as ' ', '-', and '_', and regardless of their validity in a CSS class name. This will allow you to customize the styling of the body using that CSS class name.")
      },
      {
        name: "straight edge",
        choices: ["all", "left", "right", "top", "bottom"],
        help: pui.helpTextProperties("theme","Determines which parts of the element will have a straight edge instead of rounded corners.")
      },
      pui.layout.adoptNamedProperty("color"),
      pui.layout.adoptNamedProperty("font family"),
      pui.layout.adoptNamedProperty("font size"),
      pui.layout.adoptNamedProperty("font style"),
      pui.layout.adoptNamedProperty("font weight"),
      pui.layout.adoptNamedProperty("text align"),
      pui.layout.adoptNamedProperty("text decoration"),
      pui.layout.adoptNamedProperty("text transform")
    ]);
  }

  var dom;
  if (existingDom != null) {
    dom = existingDom.cloneNode(false);
  } else {
    dom = document.createElement("div");
  }
  dom.innerHTML = "";
  var panel = new pui.CSSPanel();
  panel.forLayout = true;
  panel.container = dom;
  panel.init();
  dom.panel = panel;
  dom.sizeMe = function () {
    dom.panel.resize();
  };
  var headerText = properties["header text"];
  if (headerText != null) panel.setText(headerText);
  var headerTheme = properties["header theme"];
  if (headerTheme != null) panel.setHeaderSwatch(headerTheme);
  var bodyTheme = properties["body theme"];
  if (bodyTheme != null) panel.setBodySwatch(bodyTheme);
  panel.setStraightEdge(properties["straight edge"]);
  var hasHeader = properties["has header"];
  hasHeader = (hasHeader !== "false" && hasHeader !== false);
  panel.setHasHeader(hasHeader);
  var headerHeight = properties["header height"];
  if (headerHeight != null) panel.setHeaderHeight(headerHeight);
  panel.setAllStyles(properties);
  var height = properties["height"];
  if (height == null) height = "300px";
  panel.setHeight(height);

  if (proxyMode) {
    dom.style.position = "relative";
  }

  return dom;

};