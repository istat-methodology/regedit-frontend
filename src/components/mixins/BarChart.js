import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    props: {
      chartdata: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    }

    /* chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    } */
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
