import * as detailViewModelerComponent from './modeler-details-component.js';
import * as modelerComponent from './modeler-component.js';
var graph = new joint.dia.Graph;
var paper = {}

function initialize(rootId, options){
    var that = this;

    paper = new joint.dia.Paper({
        el: document.getElementById(rootId),
        model: graph,
        width: options.width,
        height: options.height,
        gridSize: 1
    });

    var rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Hello',
            fill: 'white'
        }
    });
    // rect.addTo(graph);
    //
    // var rect2 = rect.clone();
    // rect2.translate(300, 0);
    // rect2.attr('label/text', 'World!');
    // rect2.addTo(graph);
    //
    // var link = new joint.shapes.standard.Link();
    // link.source(rect);
    // link.target(rect2);
    // link.addTo(graph);

    if(options.debugEvents){
      graph.on('all', function(eventName, cell) {
        console.log('Event: ',eventName,cell, arguments);
      });
    }

    paper.on('cell:pointerclick', function (cellView,evt) {
      if(options.debugEvents){
          console.log('Event: cell:pointerclick',cellView, evt);
      }
    });

    paper.on('cell:pointerdblclick', function (cellView,evt) {
      if(options.debugEvents){
          console.log('Event: cell:pointerdblclick', cellView, evt);
      }
      if(cellView.model.get('handleDoubleClick')){
          cellView.model.get('handleDoubleClick')(cellView, evt, that);
      }

    });
}

function addComponent(params){
  var component =  modelerComponent.create(params);
  component.addTo(graph);
}

function createDetailsView(params){
  var view = params.view;
  var x = params.view.model.attributes.position.x;
  var y = params.view.model.attributes.position.y;
  params.position = {x: x+20, y: y+20};
  var detailsComponent = detailViewModelerComponent.create(params);

  detailsComponent.addTo(graph);
}

export {initialize,addComponent,createDetailsView, graph}
