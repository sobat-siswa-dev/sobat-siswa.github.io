// On Scroll
    window.onscroll = function () {
        stickyNavigationBar()
    };
    var header = document.getElementById("navigation");
    var sticky = header.offsetTop;

    AOS.init();

    function stickyNavigationBar() {
        if (window.pageYOffset > sticky) {
            header.classList.add("shadow");
        } else {
            header.classList.remove("shadow");
        }
    }

    $(".local-link").on("click", function (event) {
        event.preventDefault();
        $('html , body').animate({
            scrollTop: document.querySelector($(this).attr("href")).offsetTop - 60
        });
    })

// Medium Scrapper
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@edu.sobatsiswa")
    .then(response => response.json()).then(json => {
        window.mediumScrappingResult = json;
        window.mediumScrappingHtml = "";
        window.mediumScrappingResult.items.forEach(function (item, index) {
            if (index < 3) {
                var parser = new DOMParser();
                var descriptionDom = parser.parseFromString(item.description, 'text/html');
                var firstParagraph = descriptionDom.querySelector("p").innerText.split(".");
                var d = new Date(item.pubDate)
                var dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
                var [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
                window.mediumScrappingHtml += `
                    <div class="col-md-4" data-aos-duration="1000" data-aos="fade-down" data-aos-delay="150">
                        <article>
                            <div class="article-thumbnail" style="background-image: url('` + item.thumbnail + `');">
                            </div>
                            <div class="article-description">
                                <div class="article-tags">
                                    <span><i class="fab fa-medium"></i>&nbsp;&nbsp; Medium</span>
                                    <span><i class="fa fa-calendar"></i>&nbsp;&nbsp; ` + da + ' ' + mo + ' ' + ye + `</span>
                                </div>
                                <h3 class="primary-font">
                                    ` + item.title + `
                                </h3>
                                <p class="secondary-font">
                                    ` + firstParagraph[0] + `.` + firstParagraph[1] + `.` + firstParagraph[2] + `.
                                </p>
                                <a href="` + item.link + `" class="primary-font">
                                    Baca Selengkapnya
                                </a>
                            </div>
                        </article>
                    </div>
                `;
            }
        });
        $("#mediumBlogContent").html(window.mediumScrappingHtml);
    });

// Instagram Scrapper
    fetch("https://www.instagram.com/sobatsiswa.id/").then(response => response.text()).then((html) => {
        var parser = new DOMParser();
        var domResult = parser.parseFromString(html, 'text/html');
        var script = domResult.querySelectorAll("script")[4];
        var scrappingIg = new Function(script.outerHTML.replace(/<\/script>|<script type="text\/javascript">/g, ""));
        scrappingIg();
        window.instagramScrappingResult = window._sharedData.entry_data.ProfilePage[0].graphql.user;
        window.instagramScrappingHtml = '';
        window.instagramScrappingResult.edge_owner_to_timeline_media.edges.forEach(function (media, index) {
            if (index <= 7) {
                window.instagramScrappingHtml += `
                    <div class="col-md-3">
                        <article>
                            <a href="https://www.instagram.com/p/` + media.node.shortcode + `" target="_blank">
                                <div class="article-thumbnail">
                                    <img src="` + media.node.thumbnail_src + `">
                                </div>
                            </a>
                        </article>
                    </div>
                `;
            }
        });
        $("#instagramPostContent").html(window.instagramScrappingHtml);
    });