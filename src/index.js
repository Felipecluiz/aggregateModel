(function(joint) {

    var graph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });
    var paper = new joint.dia.Paper({
        el: document.getElementById('paper'),
        width: 800,
        height: 600,
        model: graph,
        //gridSize: 2,
        cellViewNamespace: joint.shapes,
        async: true,
        background: {//color: '#F3F7F6'
            
            //color: '#F3F7F6'
            color: '#F3F7A7'
            
        },
        interactive: { linkMove: false },
            viewport: function(view) {
            var element = view.model;
            // Hide any element or link which is embedded inside a collapsed parent (or parent of the parent).
            var hidden = element.getAncestors().some(function(ancestor) {
                // `isCollapsed()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
                return ancestor.isCollapsed();
            });
            return !hidden;
        }
    });

    paper.el.style.border = '1px solid #E2E2E2';

    var Container = joint.shapes.container.Parent;
    var Child = joint.shapes.container.Child;
    var Link = joint.shapes.container.Link;


/////////////containers

    var container_a = new Container({
        z: 1,
        attrs: { headerText: { text: 'key = custormerID' }},
    },);
    var container_b = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'value = object' }}
    });

    var container_c = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'order' }}
    });



    ///////////////childs


    var child_1 = new Child({
        z: 2,
        position: { x: 250, y: 150 },
        attrs: { headerText: { text: 'order' }}
    });

    var child_2 = new Child({
        z: 2,
        position: { x: 200, y: 250 },
        attrs: { headerText: { text: 'order' }}
    });

    var child_3 = new Child({
        z: 2,
        position: { x: 300, y: 250 },
        attrs: { headerText: { text: 'order' }}
    });

    var child_4 = new Child({
        z: 4,
        position: { x: 400, y: 290 },
        attrs: { headerText: { text: 'order' }}
    });

    var child_5 = new Child({
        z: 4,
        position: { x: 400, y: 270 },
        attrs: { headerText: { text: 'order' }}
    });
    var child_6 = new Child({
        z: 4,
        position: { x: 300, y: 180 },
        attrs: { headerText: { text: 'order' }}
    });



/////////////////links





    var link_1_2 = new Link({
        z: 2,
        source: { id: child_1.id },
        target: { id: child_2.id }
    });

    var link_1_3 = new Link({
        z: 2,
        source: { id: child_1.id },
        target: { id: child_3.id }
    });

    var link_4_5 = new Link({
        z: 4,
        source: { id: child_4.id },
        target: { id: child_5.id }
    });

    var link_1_b = new Link({
        z: 4,
        source: { id: child_1.id },
        target: { id: container_b.id }
    });

    var link_1_c = new Link({
        z: 4,
        source: { id: child_1.id },
        target: { id: container_c.id }
    });
    graph.addCells([
        container_a, container_b,container_c,
        child_1, child_2, child_3, child_4, child_5,child_6,
        /*link_1_2, link_1_3, link_4_5, link_1_b,link_1_c*/
    ]);
    
    container_a.embed([child_1, child_2, child_3,  container_b/*,container_c*/]);
    container_b.embed([child_4/*,container_c,child_5*/]);
    container_c.embed([child_6]);
    child_4.embed([child_5]);


    /* link_1_2.reparent();
    link_1_3.reparent();
    link_4_5.reparent();
    link_1_b.reparent();
    link_1_c.reparent();
    */

    // `toggle()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
    container_b.toggle(false);
    container_a.toggle(false);
    container_c.toggle(false);

    paper.on('element:button:pointerdown', function(elementView) {
        var element = elementView.model;
        // `toggle()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
        element.toggle();
        // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
        element.fitAncestorElements();
    });

    paper.on('element:pointermove', function(elementView) {
        var element = elementView.model;
        // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
        element.fitAncestorElements();
    });
    
    
    // paper.on('element:position', function(elementView) {
    //     var element = elementView.model;
    //     // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
    //     element.fitAncestorElements();
    // });



})(joint);