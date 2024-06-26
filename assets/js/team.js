import DataTable from 'datatables.net-dt';

const baseUrl = $('#base-url').val();
const teamId = $('#team-id').val();

let playersTable = new DataTable('#players-table', {
  processing: true,
  serverSide: true,
  ajax: {
    url: `${baseUrl}/players/list/${teamId}`,
    type: 'POST',
    data: function (param) {
      param.offset = param.start;
      param.limit = 10;
      param.orderBy = param.columns[param.order[0].column].name;
      param.orderDir = param.order[0].dir;
    },
    dataSrc : function ( json ){
      return json.datas;
    },
  },
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, 'All'],
  ],
  columns: [
    { data: "name" },
    { data: "surname" },
    {
      data: null,
      defaultContent: ""
    },
    {
      data: null,
      defaultContent: ""
    }
  ],
  columnDefs: [
    { targets: '_all', className: "dt-head-center user-select-none", orderable: false },
    { targets: 2,
      render: function (data, type, row){
        return formatDate(new Date(row.createdAt));
      }
    },
    { targets: 3,
      render: function (data, type, row){
        return formatDate(new Date(row.updatedAt));
      }
    }
  ]
});
$(".dt-length, .dt-search").hide();

$("#players-table tbody").on( 'click', 'tr', function(){
  location.href = (`${baseUrl}/players/show/${playersTable.row(this).data().id}`);
});

document.addEventListener('DOMContentLoaded', function () {
  let rows = document.querySelectorAll('.team-row');
  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      window.location.href = row.dataset.href;
    });
  });
});

function formatDate(date){
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${day} ${month} ${year}`;
}