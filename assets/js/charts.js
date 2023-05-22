export function chart (){

    const cfg = {
        type: 'line',
        data: {
            datasets: [{
                data: [20, 10],
              }],
        },
         data: [{x: 10, y: 20}, {x: 15, y: null}, {x: 20, y: 10}],
          labels: ['a', 'b'],
        options: {},
        plugins: []

    }
}