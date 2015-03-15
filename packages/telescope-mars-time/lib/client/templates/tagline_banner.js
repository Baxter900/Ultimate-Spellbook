Template[getTemplate('marsTime')].helpers({
		showMarsTime: function () {
			try{
				function update() {
				    var d = new Date();

				    $(".utc-time").text(d.toUTCString());
				    var millis = d.getTime();
				    var jd_ut = 2440587.5 + (millis / 8.64E7);
				    var jd_tt = jd_ut + (35 + 32.184) / 86400;
				    var j2000 = jd_tt - 2451545.0;
				    var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);
				    var mtc = (24 * msd) % 24;


				    function h_to_hms(h) {
			                var x = h * 3600;
			                var hh = Math.floor(x / 3600);
			                if (hh < 10) hh = "0" + hh;
			                var y = x % 3600;
			                var mm = Math.floor(y / 60);
			                if (mm < 10) mm = "0" + mm;
			                var ss = Math.round(y % 60);
			                if (ss < 10) ss = "0" + ss;
			                return hh + ":" + mm + ":" + ss;
				    }
					function add_commas(n) {
					    n += "";
					    var x = n.split(".");
					    var x1 = x[0];
					    var x2 = x.length > 1 ? "." + x[1] : "";
					    var rgx = /(\d+)(\d{3})/;
					    while (rgx.test(x1)) {
					        x1 = x1.replace(rgx, "$1" + "," + "$2");
					    }
					    return x1 + x2;
					}
					
				    $(".millis").text(add_commas(millis));
				    $(".jd_ut").text(add_commas(jd_ut.toFixed(5)));
				    $(".jd_tt").text(add_commas(jd_tt.toFixed(5)));
				    $(".j2000").text(add_commas(j2000.toFixed(5)));
				    $(".msd").text(add_commas(msd.toFixed(5)));
				    $(".mtc").text(h_to_hms(mtc));
				}
				update();
			    setInterval(update, 10);
		    }catch (exception){
				console.log(exception)
			}
			return Router.current().location.get().path == '/' && !!getSetting('showMarsTime');
		}});

