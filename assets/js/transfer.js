
const playerSelect = $('#transfer_player')
const sellerSelect = $('#transfer_seller')

sellerSelect.change(function() {
  populatePlayerOptions($(this).val())
})

$(document).ready(function() {
  if ('' === sellerSelect.val()) {
    playerSelect.empty();
  } else {
    populatePlayerOptions(sellerSelect.val())
  }
});

function populatePlayerOptions(sellerId){
  $.ajax({
    url: `${$('#base-url').val()}/players/by-team/${sellerId}`,
    success: function (data) {
      let players = data
      playerSelect.empty();
      playerSelect.append('<option value=""></option>')
      players.map(function(player){
        playerSelect.append(`<option value="${player.id}">${player.name} ${player.surname}</option>`)
      })
    }
  })
}
