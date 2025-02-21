$(document).ready(function () {
    let container = $("#portfolio-container");

    $.get("https://api.github.com/users/jason111nn/repos", function (data) {
        container.empty(); // 清空 "載入中..." 文字

        $(data).each(function (index, repo) {
            if (!repo.fork) { // 過濾 fork 的儲存庫
                let imageUrl = `https://raw.githubusercontent.com/jason111nn/${repo.name}/main/portfolio.img`;
                let demoUrl = `https://jason111nn.github.io/${repo.name}/`;
                let rawHtmlUrl = `https://jason111nn.github.io/${repo.name}`;
                let item = $("<div>").addClass("portfolio-item");
                item.append(`<h2>${repo.name}</h2>`);
                item.append(`<span>最後更新: ${new Date(repo.updated_at).toLocaleDateString()}</span>`);
                item.append(`<span>星標數: ${repo.stargazers_count}</span>`);
                item.append(`<span>Fork 數: ${repo.forks_count}</span>`);
                item.append(`<span>開放議題數: ${repo.open_issues_count}</span>`);
                if (repo.description) {
                    item.append(`<p>${repo.description}</p>`);
                }
                item.append(`<span>創建時間: ${new Date(repo.created_at).toLocaleDateString()}</span>`);

                // 顯示版本
                $.get(`https://api.github.com/repos/jason111nn/${repo.name}/releases`, function (releases) {
                    if (releases.length > 0) {
                        item.append(`<span>最新版本: ${releases[0].tag_name}</span>`);
                    }
                });

                // 顯示貢獻者
                $.get(`https://api.github.com/repos/jason111nn/${repo.name}/contributors`, function (contributors) {
                    if (contributors.length > 0) {
                        let contributorsList = contributors.map(function (contributor) {
                            return contributor.login;
                        }).join(", ");
                        item.append(`<span>貢獻者: ${contributorsList}</span>`);
                    }
                });

                let img = $("<img>").attr({ src: imageUrl, alt: imageUrl });
                img.on("error", function () {
                    $(this).attr("src", `./img/error-portfolio.jpg`); // 預設圖片
                });
                item.prepend(img);

                let buttonContainer = $("<div>");
                let repoBtn = $("<a>")
                    .attr("href", repo.html_url)
                    .attr("target", "_blank")
                    .text("查看專案");

                let demoBtn = $("<a>")
                    .text("線上 Demo")
                    .click(function () {
                        $("#iframe-viewer").attr("src", rawHtmlUrl);
                        $("body").css("overflow","none");
                        $("#iframe-container").fadeIn().css('display', 'flex');
                    });

                buttonContainer.append(repoBtn, demoBtn);
                item.append(buttonContainer);

                // 加入作品
                container.append(item);
                item.fadeIn(500);
            }
        });
    }).fail(function () {
        container.html("<p>無法載入作品集，請稍後再試。</p>");
    });
});
