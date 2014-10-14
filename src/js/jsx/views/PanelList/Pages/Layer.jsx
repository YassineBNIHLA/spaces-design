/*
 * Copyright (c) 2014 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */

define(function (require, exports, module) {
    "use strict";

    var React = require("react"),
        LayerFace = require("jsx!./LayerFace"),
        ClassSet = React.addons.classSet;

    var Layer = React.createClass({
        render: function () {
            var doc = this.props.document,
                layer = this.props.layer,
                childLayers = layer.children;
                
            var childListItemComponents = childLayers
                .filter(function (layer) {
                    return layer.kind !== layer.layerKinds.GROUPEND;
                })
                .map(function (layer) {
                    return this.transferPropsTo(
                        <Layer document={doc} layer={layer}/>
                    );
                }, this)
                .map(function (childLayerComponent, index) {
                    return (
                        <li key={index}>
                            {childLayerComponent}
                        </li>
                    );
                }, this);

            var childLayerComponents = (
                <ul>
                    {childListItemComponents}
                </ul>
            );

            var faceComponent = this.transferPropsTo(
                <LayerFace document={doc} layer={layer} />
            );

            return (
                <div>
                    {faceComponent}
                    {childLayerComponents}
                </div>
            );
        }
    });

    module.exports = Layer;
});
