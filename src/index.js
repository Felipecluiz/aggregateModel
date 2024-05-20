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

    var container_1 = new Container({
        size: { width: 300, height: 300 },
        z: 1,
        attrs: { headerText: { text: 'key = custormerID' }},
    },);
    var container_2 = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'value = object' }}
    });

    var container_3 = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'order' }}
    });


    var container_4 = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'value = d' }}
    });

    var container_5 = new Container({
        z: 3,
        size: { width: 50, height: 50 },
        attrs: { headerText: { text: 'value = e' }}
    });
    var containers = [];
    containers.push(container_1,container_2,container_3,container_4,container_5);  

    ///////////////childs


    var child_1 = new Child({
        z: 2,
        position: { x: 250, y: 150 },
        attrs: { headerText: { text: 'order1' }}
    });

    var child_2 = new Child({
        z: 2,
        position: { x: 200, y: 250 },
        attrs: { headerText: { text: 'order' }}
    });

    var child_3 = new Child({
        z: 2,
        position: { x: 300, y: 250 },
        attrs: { headerText: { text: 'order3' }}
    });

    var child_4 = new Child({
        z: 4,
        position: { x: 400, y: 290 },
        attrs: { headerText: { text: 'order4' }}
    });

    var child_5 = new Child({
        z: 4,
        position: { x: 500, y: 180 },
        attrs: { headerText: { text: 'order5' }}
    });
    var child_6 = new Child({
        z: 4,
        position: { x: 350, y: 180 },
        attrs: { headerText: { text: 'order6' }}
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
        target: { id: container_2.id }
    });

    var link_1_c = new Link({
        z: 4,
        source: { id: child_1.id },
        target: { id: container_3.id }
    });
    graph.addCells([
        container_1, container_2,container_3, container_4,container_5,
        child_1, child_2, child_3, child_4, child_5,child_6,
        /*link_1_2, link_1_3, link_4_5, link_1_b,link_1_c*/
    ]);

    
    container_1.embed([/*child_1*/, child_2, child_3,  container_2,container_3]);
    container_2.embed([child_4/*,container_3*/]);
    container_3.embed([child_6]);
    child_4.embed([child_5]);
    child_5.fitAncestorElements();
    //child_1.fitAncestorElements();

    /* link_1_2.reparent();
    link_1_3.reparent();
    link_4_5.reparent();
    link_1_b.reparent();
    link_1_c.reparent();
    */

    // `toggle()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
    container_2.toggle(false);
    container_1.toggle(false);
    container_3.toggle(false);
    container_4.toggle();
    container_5.toggle();
    

    
    paper.on('element:button:pointerdown', function(elementView) {
        var element = elementView.model;
        // `toggle()` method is defined at `joint.shapes.container.Parent` in `./joint.shapes.container.js`
        element.toggle();
        // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
        element.fitAncestorElements();
    });

    paper.on('cell:mouseover', function(elementView) {
        var element = elementView.model;
        // `fitAncestorElements()` method is defined at `joint.shapes.container.Base` in `./joint.shapes.container.js`
        element.fitAncestorElements();
    });
 
    paper.on('cell:mouseenter', function(elementView) {
        var element = elementView.model;
        if ((child_3.position().x < child_1.position().x) && (child_3.position().x+child_3.size().width > child_1.position().x)
        &&   (child_3.position().y < child_1.position().y) && (child_3.position().y+child_3.size().height > child_1.position().y)){
            //alert("teste");
            //console.log("entrou")
            child_3.embed([child_1]);
            //child_1.fitAncestorElements();
            element.fitAncestorElements();


        }

    });

    paper.on('cell:mouseenter', function(elementView) {
        var element = elementView.model;
        i=1;
        for (i=1; i < 4;i++){

            if ((containers[i].position().x < (containers[i+1]).position().x) && (containers[i].position().x+containers[i].size().width > (containers[i+1]).position().x)
            &&   (containers[i].position().y < (containers[i+1]).position().y) && (containers[i].position().y+containers[i].size().height > (containers[i+1]).position().y)){
                //alert("teste");
                //console.log("entrou")
                containers[i].embed([containers[i+1]]);
                //child_1.fitAncestorElements();
                element.fitAncestorElements();



            }}

    });

 

})(joint);
