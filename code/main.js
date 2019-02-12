var Module = {
  onRuntimeInitialized: function() {
    sim = new Simulation(51, 51)
    sim.add_electrode(25, 20, 10)
    sim.add_electrode(25, 30, -10)
    sim.run(1.75, 10000, 1e-5)


    buttons = {
      'surface': document.getElementById('surface'),
      'contour': document.getElementById('contour')
    }

    plot = {
      div: 'plotPane',
      data: [{
        z:sim.v.data,
        type:'surface',
        colorscale:'Viridis',
        aspectratio: {x: 1, y: 1},
        ncontours: 30,
        contours: {
          x: {highlight: false},
          y: {highlight: false},
          coloring: 'heatmap',
          showlabels:true,
          labelfont: {
            size: 12,
            color: 'white'
          },
        },
        line: {
          color: 'white'
        },
        colorbar: {
          titleside: 'right',
          ticksuffix: " V",
          thickness: 10,
          thicknessmode: 'pixels'
        },
        zsmooth: 'best'
      }],
      layout: {
        scene: {
          xaxis: {
            showspikes: false
          },
          yaxis: {
            showspikes: false
          },
          zaxis: {
            ticksuffix: " V",
            showspikes: false
          }
        }
      },
      options: {responsive: true}
    }

    draw_plot('surface');
    hoverInfo = document.getElementById('hoverinfo')
    buttons['surface'].addEventListener('click', function() {select_plot('surface')})
    buttons['contour'].addEventListener('click', function() {select_plot('contour')})
  }
}

function draw_plot(type) {
  if (type !== undefined) plot.data[0].type = type;
  Plotly.newPlot(plot.div, plot.data, plot.layout, plot.options)
}

function select_plot(type) {
  if (!Object.keys(buttons).includes(type)) throw "ARGUMENT ERROR in set_plot. No such plot type."
  if (plot.data[0].type != type) {
    Object.values(buttons).forEach( button => {
      button.classList.remove("button-primary");
    })
    buttons[type].classList.add("button-primary");
    Plotly.restyle(plot.div, {type: type})
  }
}
