$(document).ready(function () {
    var form = $('#form_buying_product');
    console.log(form);
    form.on('submit', function (e) {
        e.preventDefault();
        var nmb = $('#nmb').val();
        var submit_b = $('#submit_btn');
        var product_id = submit_b.data("product_id");
        var product_name = submit_b.data("name");
        var product_price = submit_b.data("price");
        console.log(product_id);
        console.log(product_name);
        console.log(product_price);

        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        var csrf_token = $('#form_buying_product [name ="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;

        var url = form.attr("action");
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                //console.log('OK');
                //console.log(data.products_total_nmb);
                if (data.products_total_nmb) {
                    $('#basket_total_nmb').text(" (" + data.products_total_nmb + ")");
                  //  console.log(data.products);
                    $('.basket-items ul').html("");
                    $.each(data.products, function (k,v) {//key value
                        $('.basket-items ul').append
                        ('<li>' + v.name + ', ' + v.nmb + 'шт. по ' + v.price_per_item + 'грн.' +
                            // '<a class="delete-item" href=" ">x</a>'+
                            '</li>');
                    })
                }
            },
            error: function () {
                console.log('error')
            }
        })

        $('.basket-items ul').append
        ('<li>' + product_name + ', ' + nmb + 'шт. по цене ' + product_price + 'грн.' +
            // '<a class="delete-item" href=" ">x</a>'+
            '</li>');
    })

    function showingBasket() {
        //toggleClass
        $('.basket-items').removeClass('hidden');
    }

    $('.basket-container').on('click', function (e) {
        e.preventDefault();
        showingBasket();
    })

    $('.basket-container').mouseover(function () {
        showingBasket();
    })

    // $('.basket-container').mouseout(function () {
    //     $('.basket-items').addClass('hidden');
    // })
    //
    $(document).on('click', 'delete_item', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();
    })
});