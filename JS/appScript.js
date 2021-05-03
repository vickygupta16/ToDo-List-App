$(document).ready(function () {
  //67-c, 86-v, 85-u, 73-i, 83-s, 80-p
  $(document).keydown = function (e) {
    if (
      e.ctrlKey &&
      (e.keyCode === 67 ||
        e.keyCode === 86 ||
        e.keyCode === 85 ||
        e.keyCode === 73 ||
        e.keyCode === 83 ||
        e.keyCode === 80)
    ) {
      return false;
    } else {
      return true;
    }
  };
  //disable source code
  $(document).keydown("u", function (e) {
    if (e.ctrlKey) {
      return false;
    } else {
      return true;
    }
  });
  //disable f12 button
  $(document).keydown(function (event) {
    if (event.keyCode == 123) {
      return false;
    }
  });
  $("#addTask").click(function () {
    if (!$("#addTask").hasClass("animate-addTaskButton")) {
      $("#addTask").addClass("animate-addTaskButton");
      setTimeout(function () {
        $("#addTask").removeClass("animate-addTaskButton");
      }, 500);
    }
  });
  $("#mode").click(function () {
    if (!$("#mode").hasClass("animate-mode")) {
      $("#mode").addClass("animate-mode");
      setTimeout(function () {
        $("#mode").removeClass("animate-mode");
      }, 500);
    }
  });
  $(".info-contact").click(function () {
    if (
      $(".code-logo").hasClass("animate-code-logo") &&
      $(".dev-logo").hasClass("animate-dev-logo")
    ) {
      classing();
    } else {
      $(".code-logo").addClass("animate-code-logo");
      $(".dev-logo").addClass("animate-dev-logo");
      $(".code-logo").removeClass("hide-code-logo");
      $(".dev-logo").removeClass("hide-dev-logo");
    }
  });
  $(".code-logo").click(function () {
    classing();
  });
  $(".dev-logo").click(function () {
    classing();
  });
  function classing() {
    $(".code-logo").addClass("hide-code-logo");
    $(".dev-logo").addClass("hide-dev-logo");
    setTimeout(function () {
      $(".code-logo").removeClass("animate-code-logo");
      $(".dev-logo").removeClass("animate-dev-logo");
    }, 500);
  }
});

// export function displayModal() {
//   $("#passwordResultModal").modal("toggle");
// }
