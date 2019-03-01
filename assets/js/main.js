var $tdtxt = $('#tdtxt');

$(document).ready(function () {
    $(".btn-add").click(function () {
        if ($tdtxt.val() === "")
            alert("Text area is empty!");
        else 
        {
            var $copy = $(".copy");
            var $text = $copy.children('.control-group').children('input');
            $text.attr('value', $tdtxt.val());
            $(".add-here").after($copy.html());
            $tdtxt.val("");
        }
    });

    $("body").on("click", ".remove", function () {
        $(this).parents(".control-group").remove();
    });
    $("body").on("click", "#chk", function () {
        if ($(this).is(':checked')) {
            $(this).parents(".control-group").children("#txt").addClass("Checked");
        } else {
            $(this).parents(".control-group").children("#txt").removeClass("Checked");
        }
    });
});
