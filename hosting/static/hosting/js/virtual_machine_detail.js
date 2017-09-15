$(document).ready(function () {
    var create_vm_form = $('#virtual_machine_create_form');
    create_vm_form.submit(function () {
        $.ajax({
            url: create_vm_form.attr('action'),
            type: 'POST',
            data: create_vm_form.serialize(),
            success: function (data) {
                if (data.status === true) {
                    fa_icon = $('.modal-icon > .fa');
                    fa_icon.attr('class', 'fa fa-check');
                    $('.modal-header > .close').attr('class', 'close');
                    $('#createvm-modal-title').text(data.msg_title);
                    $('#createvm-modal-body').text(data.msg_body);
                    $('#createvm-modal').on('hidden.bs.modal', function () {
                        window.location = data.redirect;
                    })
                }
            }
        });
        return false;
    });

    $('#confirm-cancel').on('click', '.btn-ok', function (e) {
        $('#virtual_machine_cancel_form').trigger('submit');
    });

    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop() || $('html').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });

});