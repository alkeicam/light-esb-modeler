// function create(params){
//   var rect = new joint.shapes.standard.Rectangle();
//   rect.position(100, 30);
//   rect.resize(100, 40);
//   rect.attr({
//       body: {
//           fill: 'blue'
//       },
//       label: {
//           text: params.label,
//           fill: 'white'
//       }
//   });
//   return rect;
// }
function create(params){
  var m1 = new joint.shapes.devs.Model({
        position: { x: 50, y: 50 },
        size: { width: 90, height: 90 },
        inPorts: ['in1','in2'],
        outPorts: ['out'],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: '#16A085',
                            magnet: 'passive'
                        }
                    }
                },
                'out': {
                    attrs: {
                        '.port-body': {
                            fill: '#E74C3C'
                        }
                    }
                }
            }
        },
        attrs: {
            '.label': { text: params.name, 'ref-x': .5, 'ref-y': .2 },
            rect: { fill: '#2ECC71' }
        },
        name: params.name,
        malina: params.name,
        handleDoubleClick: function(cellView, evt, caller) {
          var name = cellView.model.get('name')+'['+cellView.model.id+']';
          caller.createDetailsView({view: cellView, label: name});
        }
    })
    return m1;
}

function createSleepComponent(params){
  var sleepComponent = create(params);
  sleepComponent.fields = [{label: 'miliseconds', type: 'number', value: 100}];
  return sleepComponent;
}
export {create}
