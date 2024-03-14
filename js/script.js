$(document).ready(function(){
    // Define a posição da div #container como absoluta e o top para -100%
    $("#container").css({
        position: 'absolute', // ou 'fixed' se você quiser que a div fique fixa na tela
        top: '-100%' 
      })
    
      // Animação para deslizar para baixo até a posição original
      $("#container").animate({ top: "210px" }, 1500)

      //Evitando o comportamento default do submit e recuperando o valor contido

      $('#search').on('submit', async e => {
        e.preventDefault();

        // Limpar mensagens de erro anteriores
        clearAlert();
    
        const cityName = $('#city_name').val();
        if (!cityName) {
            $('#weather').removeClass('show')
            showAlert('Você precisa digitar uma cidade...')
            return
        }

        // Chave da API do OpenWeatherMap
        const api_key = '88dabd7ebf1850cdc5a2872b8c654c8b'

        // Construindo a URL para a API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${api_key}&units=metric&lang=pt_br`;

        // Fazendo a requisição à API usando AJAX
        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function(json) {

                //Mostrar o icone que esta ocultado conforme pesquisar
                
                $('#weather').addClass('show')

                // Dados da resposta
                $('#temp_value').html(`${json.main.temp.toFixed(1).toString().replace('.', ',')}<sup>&deg;c</sup>`)
                $('#temp_description').html(json.weather[0].description)
                $('#title').html(`${json.name} , ${json.sys.country}`)
                $('#temp_max').html(`${json.main.temp_max.toFixed(1).toString().replace('.', ',')}<sup>&deg;c</sup>`)
                $('#temp_min').html(`${json.main.temp_min.toFixed(1).toString().replace('.', ',')}<sup>&deg;c</sup>`)
                $('#humidity').html(`${json.main.humidity}%`)
                $('#wind').html(`${json.wind.speed.toFixed(1).toString().replace('.', ',')} km/h`)
                $('#temp_img').attr('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
            },
            error: function() {
                $('#weather').removeClass('show')
                showAlert(`
                  Erro ao buscar dados de clima...

                  <img src="images/404.svg">
                `);
            }
        })
    });

    function showAlert(msg) {      
        $('#alert').html(msg)
    }

    function clearAlert() {
      $('#alert').html('').hide(); // Esconder o alerta e limpar a mensagem
    }

  })
