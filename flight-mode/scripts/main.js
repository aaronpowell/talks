$(function() {
    var steps = $('[data-highlight-start]').map(function () {
        return $(this).attr('class').replace('slide ', '');
    }).get();

    $.deck('.slide');

    $(document).on('deck.change', function (e, from, to) {
        var slide = $.deck('getSlide', to);

        if (steps.filter(function (s) { return slide.hasClass(s); }).length) {
            var cm = slide.parent().find('.CodeMirror');
            cm.find('.CodeMirror-inactive').removeClass('CodeMirror-inactive')
            var lines = cm.find('.CodeMirror-lines pre:not(.CodeMirror-cursor)');
            var start = slide.data('highlightStart') - 1;
            var end = slide.data('highlightEnd') - 1;
            lines.filter(function (i, line) {
                if (i > end || i < start) {
                    $(line).addClass('CodeMirror-inactive');
                }
            });
        } else if (slide.find('.CodeMirror').length) {
            slide.find('.CodeMirror-inactive').removeClass('CodeMirror-inactive');
        }
    });

    document.getElementById('ua').innerText = navigator.userAgent;

    $('a[href^=http]').attr('target', '_blank');
});