$("document").ready(function(){
  activateMenu();
  $("a[href='#']").click(ignoreLink);
  renderErrorJSON();

  $(".respond").each(function(){
    renderRespond($(this));
  })
})

function activateMenu(){
  $("#menuAPI ul li").click(function(){
    $("#menuAPI .selected").removeClass("selected");
    $(this).addClass("selected");
    sortMenu();
  })

  sortMenu();
}
function sortMenu(){
  $(".divAPI").hide();
  var selectedAPI = $("#menuAPI ul li.selected").attr("data-api");
  $(selectedAPI).show();
}

function renderRespond(res){
  var url = res.data("url");
  var verb = res.data("verb");
  console.log(url);
  console.log(verb);
  console.log("\n\n\n");
  $.ajax({
    url: url,
    type: verb,
    success: function(json){
      json = json.filter((i, index) => (index < 2)); //if array length is big -> display only first 2 objects
      res.jsonPresenter({json});
    }
  })
}

function ignoreLink(e){
  e.preventDefault();
  alert("Link not available because Verb isn't GET. try to use Postman instead");
}

function renderErrorJSON(){
  $("#errorRespond").jsonPresenter({
    json: {
      status: 'false',
      error: 'this is your error message'
    }
  })
}
