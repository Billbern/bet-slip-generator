function dispSlips(item, key, slipsData) {
    const slipsContainer = document.querySelector("#selectSlip").firstElementChild;
    const slipitem = `<div class="item-slip" data-key="${key}"><div class="slip-contain"><div class="slip-icon"><span><svg width="24" height="24" viewBox="0 0 210.68 210.68" xmlns="http://www.w3.org/2000/svg"><path d="M67.89 66.08h39.453c4.141 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356H67.89c-4.14 0-7.496 3.294-7.496 7.356 0 4.062 3.356 7.357 7.496 7.357zM142.788 82.442H67.89c-4.14 0-7.496 3.294-7.496 7.356s3.356 7.356 7.496 7.356h74.898c4.14 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356zM67.89 128.235h53.336c4.141 0 7.496-3.294 7.496-7.356s-3.355-7.357-7.496-7.357H67.89c-4.14 0-7.496 3.294-7.496 7.357s3.356 7.356 7.496 7.356zM142.788 144.6H67.89c-4.14 0-7.496 3.294-7.496 7.356s3.356 7.356 7.496 7.356h74.898c4.14 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356z"/><path d="M174.383 19.816L158.446 4.175c-1.405-1.38-3.312-2.155-5.3-2.155s-3.895.775-5.301 2.155l-10.636 10.439-10.637-10.44c-1.406-1.38-3.313-2.154-5.3-2.154s-3.895.775-5.302 2.155l-10.634 10.438L94.703 4.175A7.57 7.57 0 0089.4 2.02 7.566 7.566 0 0084.1 4.176L73.469 14.613 62.833 4.175c-1.405-1.38-3.312-2.155-5.3-2.155s-3.895.775-5.3 2.155L36.295 19.816a7.288 7.288 0 00-2.194 5.201v160.65c0 1.951.79 3.822 2.195 5.202l15.936 15.637c2.926 2.873 7.672 2.872 10.599 0l10.638-10.438 10.639 10.438c1.406 1.379 3.313 2.154 5.3 2.154s3.895-.776 5.3-2.156l10.629-10.434 10.634 10.435c2.927 2.873 7.672 2.872 10.6 0l10.638-10.437 10.637 10.437c1.463 1.436 3.382 2.154 5.3 2.154s3.837-.718 5.3-2.154l15.936-15.636a7.285 7.285 0 002.195-5.203V25.017a7.294 7.294 0 00-2.195-5.201zM161.586 182.62l-8.44 8.282-10.637-10.437c-2.928-2.873-7.672-2.872-10.599 0l-10.638 10.437-10.636-10.437a7.562 7.562 0 00-5.3-2.154 7.562 7.562 0 00-5.3 2.156L89.408 190.9 78.77 180.465c-2.927-2.872-7.672-2.872-10.6 0l-10.637 10.437-8.44-8.282V28.065l8.44-8.285L68.17 30.219a7.57 7.57 0 005.3 2.155 7.568 7.568 0 005.302-2.156l10.63-10.437 10.634 10.438c1.405 1.38 3.312 2.155 5.3 2.155s3.895-.775 5.301-2.155l10.635-10.44 10.638 10.44a7.568 7.568 0 005.301 2.155 7.57 7.57 0 005.301-2.155l10.636-10.44 8.44 8.285V182.62z"/></svg></span></div>
                                        <div class="slip-content">
                                            <div class="content-left">
                                                <div class="slip-code">
                                                    <span>${item.code}</span>
                                                </div>
                                                <div class="slip-gme">
                                                    <span>${item.games.length} games</span>
                                                </div>
                                            </div>
                                            <div class="content-right">
                                                <span>${item.odds} odds</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    slipsContainer.innerHTML = slipsContainer.innerHTML + slipitem;

    document.querySelectorAll(".item-slip").forEach(slip => {
        slip.addEventListener("click", (e) => {
            if (!e.target.classList.contains("active")) {
                Object.values(e.target.parentNode.children).forEach(node => {
                    node.classList.remove("active");
                });

                e.target.classList.add("active");

                const slipGames = slipsData[e.target.getAttribute("data-key")];
                dispGames(slipGames);
            }
        })
    })
};

function dispGames(data) {
    const gmesContainer = document.querySelector("#gmeDisplay");
    gmesContainer.innerHTML = `<div class="yes-gme">
                                    <div class="single-contain">
                                        <div class="code-details">
                                            <div class="slip-details">
                                                <div class="slip-icon">
                                                    <span>
                                                        <svg width="24" height="24" viewBox="0 0 210.68 210.68" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M67.89 66.08h39.453c4.141 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356H67.89c-4.14 0-7.496 3.294-7.496 7.356 0 4.062 3.356 7.357 7.496 7.357zM142.788 82.442H67.89c-4.14 0-7.496 3.294-7.496 7.356s3.356 7.356 7.496 7.356h74.898c4.14 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356zM67.89 128.235h53.336c4.141 0 7.496-3.294 7.496-7.356s-3.355-7.357-7.496-7.357H67.89c-4.14 0-7.496 3.294-7.496 7.357s3.356 7.356 7.496 7.356zM142.788 144.6H67.89c-4.14 0-7.496 3.294-7.496 7.356s3.356 7.356 7.496 7.356h74.898c4.14 0 7.496-3.293 7.496-7.356s-3.355-7.356-7.496-7.356z"/>
                                                            <path d="M174.383 19.816L158.446 4.175c-1.405-1.38-3.312-2.155-5.3-2.155s-3.895.775-5.301 2.155l-10.636 10.439-10.637-10.44c-1.406-1.38-3.313-2.154-5.3-2.154s-3.895.775-5.302 2.155l-10.634 10.438L94.703 4.175A7.57 7.57 0 0089.4 2.02 7.566 7.566 0 0084.1 4.176L73.469 14.613 62.833 4.175c-1.405-1.38-3.312-2.155-5.3-2.155s-3.895.775-5.3 2.155L36.295 19.816a7.288 7.288 0 00-2.194 5.201v160.65c0 1.951.79 3.822 2.195 5.202l15.936 15.637c2.926 2.873 7.672 2.872 10.599 0l10.638-10.438 10.639 10.438c1.406 1.379 3.313 2.154 5.3 2.154s3.895-.776 5.3-2.156l10.629-10.434 10.634 10.435c2.927 2.873 7.672 2.872 10.6 0l10.638-10.437 10.637 10.437c1.463 1.436 3.382 2.154 5.3 2.154s3.837-.718 5.3-2.154l15.936-15.636a7.285 7.285 0 002.195-5.203V25.017a7.294 7.294 0 00-2.195-5.201zM161.586 182.62l-8.44 8.282-10.637-10.437c-2.928-2.873-7.672-2.872-10.599 0l-10.638 10.437-10.636-10.437a7.562 7.562 0 00-5.3-2.154 7.562 7.562 0 00-5.3 2.156L89.408 190.9 78.77 180.465c-2.927-2.872-7.672-2.872-10.6 0l-10.637 10.437-8.44-8.282V28.065l8.44-8.285L68.17 30.219a7.57 7.57 0 005.3 2.155 7.568 7.568 0 005.302-2.156l10.63-10.437 10.634 10.438c1.405 1.38 3.312 2.155 5.3 2.155s3.895-.775 5.301-2.155l10.635-10.44 10.638 10.44a7.568 7.568 0 005.301 2.155 7.57 7.57 0 005.301-2.155l10.636-10.44 8.44 8.285V182.62z"/>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class="slip-body">
                                                    <div>
                                                        <input id="codeText" type="text" value="${data.code}" readonly/>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <span class="icon">
                                                                <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M507.121 301.546c-19.619-31.453-47.015-57.738-79.228-76.014-33.232-18.855-71.11-28.82-109.539-28.82-2.497 0-4.993.048-7.485.13-8-19.946-20.16-38.389-35.445-53.64-30.071-29.993-70.025-46.513-112.501-46.513-42.471 0-82.428 16.519-112.513 46.514C20.225 173.31 3.601 213.37 3.601 256c0 42.63 16.624 82.689 46.81 112.797 30.083 29.994 70.04 46.51 112.512 46.51 24.61 0 49.05-5.751 70.949-16.647a222.831 222.831 0 0084.482 16.65c38.428 0 76.306-9.966 109.539-28.821 32.212-18.276 59.61-44.561 79.228-76.014a8.44 8.44 0 000-8.93zm-214.006-103.37c-17.838 2.035-35.359 6.19-52.134 12.406 6.07-18.069 15.727-34.725 28.487-49.09a143.96 143.96 0 0123.647 36.684zm-121.753-84.355c32.085 1.863 62.169 14.329 86.17 35.71-17.854 19.843-30.374 43.67-36.522 69.59a219.2 219.2 0 00-12.194 6.411c-11.274 6.397-21.94 13.793-31.907 22.028h-5.547zm-16.878-.001v133.74h-45.57c-1.895-36.568-16.089-70.84-40.593-98.043 24.007-21.373 54.087-33.834 86.163-35.697zm-98.116 47.656c21.34 23.988 33.776 54.027 35.637 86.084H20.733c1.86-32.058 14.298-62.097 35.635-86.084zM20.733 264.437h71.272c-1.86 32.058-14.297 62.097-35.637 86.086-21.338-23.988-33.776-54.03-35.635-86.086zm133.751 133.74c-32.076-1.863-62.157-14.323-86.163-35.696 24.504-27.2 38.698-61.475 40.593-98.044h45.57v4.39a222.95 222.95 0 00-24.895 32.72 8.439 8.439 0 000 8.931 222.933 222.933 0 0024.895 32.717zm-7.709-92.165c8.342-12.633 18.077-24.289 28.937-34.773v69.547c-10.86-10.487-20.596-22.142-28.937-34.774zm24.587 92.165v-38.451c11.515 10.164 24.06 19.165 37.454 26.766 1.592.903 3.204 1.768 4.818 2.63a143.166 143.166 0 01-42.272 9.055zm272.758-42.754a205.855 205.855 0 01-24.556 16.39c-30.698 17.418-65.695 26.623-101.21 26.623s-70.512-9.205-101.21-26.623a205.526 205.526 0 01-24.554-16.39v-98.82a205.25 205.25 0 0124.554-16.39c30.698-17.416 65.696-26.623 101.21-26.623 35.514 0 70.512 9.205 101.21 26.623a205.387 205.387 0 0124.556 16.39zm16.876-14.64v-69.545c10.86 10.485 20.594 22.14 28.937 34.772-8.342 12.634-18.076 24.29-28.937 34.774z"/>
                                                                    <path d="M430.668 295.894h-16.523v-11.905a8.559 8.559 0 00-17.118 0v11.905h-24.254v-11.905a8.559 8.559 0 00-17.118 0v11.905h-24.252v-11.905a8.559 8.559 0 00-17.118 0v11.905h-24.252v-11.905a8.559 8.559 0 00-17.118 0v11.905h-24.254v-11.905a8.559 8.559 0 00-17.118 0v11.905h-16.522a8.559 8.559 0 000 17.118h16.523v11.904a8.559 8.559 0 0017.118 0v-11.904h24.254v11.904a8.559 8.559 0 0017.118 0v-11.904h24.252v11.904a8.559 8.559 0 0017.118 0v-11.904h24.252v11.904a8.559 8.559 0 0017.118 0v-11.904h24.253v11.904a8.559 8.559 0 0017.118 0v-11.904h16.523a8.559 8.559 0 000-17.118z"/>
                                                                </svg>
                                                            </span>
                                                            <span>${data.games.length} games</span>
                                                        </div>
                                                        <div>
                                                            <span class="icon">
                                                                <svg width="24" height="24" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                                                                    <g transform="translate(1.625 1.625) scale(.24365)">
                                                                        <circle cx="256" cy="256" r="248" fill="#515262"/>
                                                                        <circle cx="256" cy="256" r="153" fill="#eff2fa"/>
                                                                        <path d="M96.629 163.987l-55.433-32.004C20.088 168.465 8 210.82 8 256h64c0-33.521 8.968-64.945 24.629-92.013z" fill="#515262"/>
                                                                        <path d="M163.987 96.629l-32.004-55.434a249.23 249.23 0 00-90.787 90.788l55.433 32.004a184.899 184.899 0 0167.358-67.358z" fill="#eff2fa"/>
                                                                        <path d="M256 72V8c-45.18 0-87.535 12.087-124.017 33.196l32.004 55.434C191.055 80.969 222.479 72 256 72z" fill="#515262"/>
                                                                        <path d="M440 256h64c0-45.18-12.087-87.535-33.196-124.017l-55.433 32.004C431.032 191.055 440 222.479 440 256z" fill="#eff2fa"/>
                                                                        <path d="M415.371 163.987l55.433-32.004a249.205 249.205 0 00-90.787-90.787l-32.004 55.433a184.899 184.899 0 0167.358 67.358z" fill="#515262"/>
                                                                        <path d="M348.013 96.629l32.004-55.433C343.535 20.088 301.18 8 256 8v64c33.521 0 64.945 8.969 92.013 24.629zM72 256H8c0 45.18 12.088 87.535 33.196 124.018l55.433-32.005C80.968 320.945 72 289.521 72 256zm276.013 159.371l32.004 55.433a249.21 249.21 0 0090.787-90.786l-55.433-32.005a184.899 184.899 0 01-67.358 67.358z" fill="#eff2fa"/>
                                                                        <path d="M96.629 348.013l-55.433 32.005a249.195 249.195 0 0090.787 90.786l32.004-55.433a184.899 184.899 0 01-67.358-67.358zM440 256c0 33.521-8.968 64.945-24.629 92.013l55.433 32.005C491.913 343.535 504 301.18 504 256zM256 440v64c45.18 0 87.535-12.088 124.017-33.196l-32.004-55.433C320.945 431.032 289.521 440 256 440z" fill="#515262"/>
                                                                        <g fill="#eff2fa"><path d="M163.987 415.371l-32.004 55.433C168.465 491.913 210.82 504 256 504v-64c-33.521 0-64.945-8.968-92.013-24.629zm233.291-217.71c-5.033-12.173-11.841-23.87-20.236-34.766l-3.429-4.452 23.043-13.303 2.618 3.483c8.851 11.781 16.1 24.182 21.544 36.859l1.725 4.015-23.121 13.349z"/>
                                                                            <path d="M395.342 151.578l-14.403 8.315c8.429 10.941 15.532 22.942 20.884 35.889l14.477-8.358c-5.518-12.849-12.66-24.802-20.958-35.846zm-46.237-16.62c-10.896-8.395-22.593-15.203-34.766-20.236l-5.185-2.144 13.348-23.121 4.015 1.725c12.677 5.444 25.078 12.693 36.859 21.545l3.483 2.617-13.303 23.043z"/>
                                                                            <path d="M316.218 110.177c12.946 5.353 24.947 12.456 35.888 20.884l8.315-14.403c-11.044-8.298-22.997-15.439-35.846-20.958zm-40.099-5.564c-7.658-1.009-14.05-1.479-20.119-1.479s-12.461.47-20.119 1.479l-5.56.733v-26.75l4.335-.517c7.835-.936 14.816-1.39 21.344-1.39s13.509.454 21.344 1.39l4.335.517v26.75z"/>
                                                                            <path d="M235.239 82.962v16.775c6.811-.897 13.706-1.521 20.761-1.521s13.951.624 20.761 1.521V82.962c-6.821-.814-13.724-1.354-20.761-1.354s-13.939.539-20.761 1.354zm171.415 198.717l.733-5.561c1.009-7.657 1.479-14.05 1.479-20.118s-.47-12.461-1.479-20.118l-.733-5.561h26.75l.517 4.335c.936 7.835 1.39 14.816 1.39 21.344 0 6.529-.455 13.511-1.39 21.344l-.518 4.335z"/>
                                                                            <path d="M413.784 256c0 7.056-.624 13.951-1.521 20.761h16.775c.814-6.821 1.354-13.724 1.354-20.761s-.54-13.939-1.354-20.761h-16.775c.897 6.81 1.521 13.705 1.521 20.761zM78.597 281.679l-.518-4.335c-.935-7.833-1.39-14.814-1.39-21.344 0-6.527.454-13.509 1.39-21.344l.517-4.335h26.75l-.733 5.561c-1.009 7.657-1.479 14.05-1.479 20.118s.47 12.461 1.479 20.118l.733 5.561z"/>
                                                                            <path d="M98.216 256c0-7.056.624-13.951 1.521-20.761H82.962c-.814 6.822-1.354 13.725-1.354 20.761 0 7.037.54 13.939 1.354 20.761h16.775c-.897-6.81-1.521-13.705-1.521-20.761zm46.925-140.656l3.483-2.617c11.781-8.852 24.182-16.101 36.859-21.545l4.015-1.725 13.348 23.121-5.185 2.144c-12.173 5.033-23.87 11.841-34.766 20.236l-4.451 3.429z"/>
                                                                            <path d="M159.894 131.062c10.941-8.429 22.942-15.532 35.888-20.884L187.424 95.7c-12.849 5.519-24.802 12.66-35.846 20.958zm213.72 222.494l3.429-4.451c8.394-10.896 15.202-22.592 20.235-34.766l2.144-5.186 23.121 13.349-1.725 4.015c-5.443 12.675-12.691 25.076-21.544 36.859l-2.618 3.483z"/><path d="M416.3 324.576l-14.477-8.358c-5.352 12.946-12.455 24.947-20.884 35.888l14.403 8.316c8.298-11.044 15.44-22.997 20.958-35.846zM256 435.311c-6.527 0-13.509-.454-21.344-1.39l-4.335-.517v-26.75l5.56.733c7.658 1.009 14.05 1.479 20.119 1.479s12.461-.47 20.119-1.479l5.56-.733v26.75l-4.335.517c-7.835.935-14.817 1.39-21.344 1.39z"/>
                                                                            <path d="M276.761 429.039v-16.776c-6.81.897-13.705 1.521-20.761 1.521s-13.951-.624-20.761-1.521v16.776c6.822.814 13.725 1.354 20.761 1.354s13.939-.54 20.761-1.354zm32.393-29.617l5.185-2.144c12.173-5.033 23.87-11.842 34.766-20.236l4.451-3.429 13.303 23.043-3.483 2.617c-11.781 8.852-24.183 16.101-36.859 21.545l-4.015 1.725z"/>
                                                                            <path d="M352.106 380.938c-10.941 8.429-22.942 15.532-35.888 20.884l8.358 14.477c12.849-5.518 24.802-12.66 35.846-20.958zm-166.623 39.88c-12.676-5.444-25.078-12.693-36.859-21.545l-3.483-2.617 13.303-23.043 4.451 3.429c10.896 8.394 22.593 15.203 34.766 20.236l5.185 2.144-13.348 23.121z"/>
                                                                            <path d="M195.782 401.823c-12.946-5.352-24.947-12.456-35.888-20.884l-8.315 14.403c11.044 8.298 22.997 15.44 35.846 20.958zm-83.056-38.448c-8.853-11.783-16.102-24.184-21.544-36.859l-1.725-4.015 23.121-13.349 2.144 5.186c5.033 12.173 11.841 23.87 20.235 34.766l3.429 4.451-23.042 13.303z"/>
                                                                            <path d="M131.062 352.106c-8.429-10.941-15.532-22.942-20.884-35.888L95.7 324.576c5.518 12.849 12.66 24.802 20.958 35.846zM89.457 189.498l1.725-4.015c5.444-12.677 12.693-25.078 21.544-36.859l2.618-3.483 23.043 13.303-3.429 4.452c-8.395 10.896-15.203 22.592-20.236 34.766l-2.144 5.186z"/>
                                                                            <path d="M95.7 187.424l14.477 8.358c5.352-12.946 12.456-24.947 20.884-35.889l-14.403-8.315c-8.298 11.044-15.44 22.997-20.958 35.846z"/>
                                                                        </g>
                                                                        <path d="M437.02 74.98C388.667 26.628 324.38 0 256 0S123.333 26.628 74.98 74.98 0 187.62 0 256s26.628 132.668 74.98 181.02C123.333 485.372 187.62 512 256 512s132.667-26.628 181.02-74.98C485.372 388.668 512 324.38 512 256s-26.628-132.667-74.98-181.02zm30.669 294.001L426.1 344.97c12.809-24.39 20.521-51.852 21.721-80.97h48.032c-1.247 37.847-11.294 73.501-28.164 104.981zM248 447.821v48.032c-37.847-1.247-73.501-11.293-104.981-28.163l24.012-41.59c24.389 12.808 51.851 20.521 80.969 21.721zm16 0c29.118-1.2 56.58-8.913 80.97-21.721l24.012 41.59c-31.48 16.87-67.135 26.917-104.981 28.163zM256 432c-97.047 0-176-78.953-176-176S158.953 80 256 80s176 78.953 176 176-78.953 176-176 176zM16.147 264h48.032c1.2 29.118 8.913 56.58 21.721 80.97l-41.59 24.012C27.441 337.501 17.394 301.847 16.147 264zm28.164-120.981L85.9 167.03C73.092 191.42 65.379 218.882 64.179 248H16.147c1.247-37.847 11.294-73.501 28.164-104.981zM264 64.179V16.147c37.847 1.246 73.501 11.293 104.981 28.163L344.97 85.9C320.58 73.092 293.118 65.379 264 64.179zm-16 0c-29.118 1.2-56.58 8.913-80.97 21.721l-24.012-41.59c31.48-16.87 67.135-26.917 104.981-28.163zM447.821 248c-1.2-29.118-8.913-56.58-21.721-80.97l41.59-24.012c16.87 31.48 26.917 67.135 28.163 104.981zm11.842-118.822l-41.581 24.007a193.513 193.513 0 00-59.267-59.267l24.007-41.581a241.868 241.868 0 0176.841 76.841zM129.178 52.337l24.007 41.581a193.513 193.513 0 00-59.267 59.267l-41.581-24.007a241.868 241.868 0 0176.841-76.841zM52.337 382.822l41.581-24.007a193.513 193.513 0 0059.267 59.267l-24.007 41.581a241.868 241.868 0 01-76.841-76.841zm330.485 76.841l-24.007-41.581a193.513 193.513 0 0059.267-59.267l41.581 24.007a241.868 241.868 0 01-76.841 76.841z" fill="#2d2b29"/>
                                                                        <path d="M362.101 158.641a7.977 7.977 0 005.895 2.59 8 8 0 005.891-13.41 161.518 161.518 0 00-9.714-9.713 8 8 0 00-10.819 11.787 145.189 145.189 0 018.747 8.746zM112 256c0-79.402 64.598-144 144-144 23.799 0 47.377 5.925 68.187 17.134a8 8 0 107.587-14.087C308.641 102.586 282.439 96 256 96c-88.224 0-160 71.776-160 160 0 36.744 12.766 72.633 35.947 101.056a7.985 7.985 0 006.205 2.944 8 8 0 006.195-13.057C123.487 321.368 112 289.07 112 256zm284.937-75.804a8 8 0 00-10.838-3.247 8 8 0 00-3.247 10.837C394.07 208.602 400 232.19 400 256c0 79.402-64.598 144-144 144-33.071 0-65.37-11.488-90.946-32.349a8 8 0 00-11.256 1.144 8 8 0 001.144 11.256C183.365 403.233 219.254 416 256 416c88.224 0 160-71.776 160-160 0-26.451-6.592-52.664-19.063-75.804z" fill="#2d2b29"/>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            <span>${data.odds} odds</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="gme-details">
                                                <span class="active">Games</span>
                                                <span>Analysis</span>
                                            </div>
                                        </div>
                                        <div class="gap">
                                        </div>
                                        <div class="code-gmes">
                                            <div class="gmes-contain">
                                                ${
                                                    data.games.map(game => {
                                                        return `
                                                            <div>
                                                                <div class="gme-icon">
                                                                    <svg width="16" height="" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M256 492.122c72.334 0 137.057-32.537 180.37-83.758 34.775-41.124 55.753-94.29 55.753-152.364C492.122 125.593 386.407 19.878 256 19.878c-81.687 0-153.683 41.484-196.078 104.532C34.637 162.012 19.877 207.282 19.877 256 19.88 386.406 125.594 492.122 256 492.122zm212.834-215.306c.099.091.203.173.307.257a212 212 0 01-15.8 62.282 214.723 214.723 0 01-9.089 18.867c-.146.011-.293.021-.44.044l-61.687 9.182-24.02 3.575-39.524-51.506-1.04-1.356 25.762-79.288 62.117-20.41zM266.98 102.229l75.03-42.018a5.71 5.71 0 00.367-.23c24.286 10.712 46.164 25.692 65.057 44.584a219.522 219.522 0 017.96 8.408c-.031.12-.066.239-.09.362l-16.55 84.202-64.232 21.105-67.543-49.073zm35.477 232.349l38.666 50.388-33.392 78.532a5.908 5.908 0 00-.153.416c-16.753 4.145-34.003 6.248-51.58 6.248-17.575 0-34.824-2.103-51.578-6.248a5.837 5.837 0 00-.153-.416l-33.391-78.532 38.666-50.388zM104.566 104.565c18.893-18.893 40.771-33.872 65.057-44.584.12.08.24.159.366.23l75.03 42.017v67.34l-63.787 46.344-3.756 2.728-64.23-21.105-7.594-38.633-8.956-45.568c-.024-.122-.058-.242-.09-.362a217.206 217.206 0 017.96-8.407zM67.75 358.221a214.514 214.514 0 01-9.09-18.867 211.977 211.977 0 01-15.8-62.282c.104-.084.209-.165.308-.256l63.413-58.354 62.117 20.41 25.761 79.288-40.565 52.861-85.705-12.756a5.628 5.628 0 00-.44-.044z"/>
                                                                    </svg>
                                                                </div>
                                                                <div class="gme-content">
                                                                    <div class="gme-match">
                                                                        ${game.match}
                                                                    </div>
                                                                    <div class="gme-option">
                                                                        <span>
                                                                            ${game.option}
                                                                        </span>
                                                                        @
                                                                        <span>
                                                                            ${game.odds}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>`
                                                    }).join('')
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    document.querySelector("#codeText").addEventListener("click", (e)=>{ copyToBoard(e.target); });
};

function copyToBoard(text){
    const tipper = document.querySelector("#tips");
    
    text.select();
    text.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text.value);

    tipper.innerHTML = `<div>${text.value} copied!!!</div>`;
    tipper.classList.remove("hide");
    
    setTimeout(() => {
        tipper.classList.add("hide");
    }, 1500);
};

function dispEmpty(){
    const slipsContainer = document.querySelector("#selectSlip").firstElementChild;
    slipsContainer.innerHTML = `
                    <div style=" gap:8px; color: #93959e; height:100%; width:100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <svg fill="#93959e" width="64" height="64" viewBox="0 0 121.669 121.669" xmlns="http://www.w3.org/2000/svg">
                            <path d="M60.835 119.978c-32.61 0-59.143-26.532-59.143-59.144 0-32.611 26.532-59.143 59.143-59.143s59.142 26.532 59.142 59.143c.001 32.612-26.531 59.144-59.142 59.144zm0-112.453c-29.395 0-53.31 23.915-53.31 53.309 0 29.395 23.915 53.31 53.31 53.31s53.309-23.915 53.309-53.31c0-29.394-23.914-53.31-53.31-53.31z"/>
                            <path d="M78.343 96.42H72.51c0-5.486-5.325-9.947-11.869-9.947s-11.869 4.462-11.869 9.946H42.94c0-8.7 7.941-15.78 17.702-15.78s17.702 7.078 17.702 15.78zM32.938 68.985c-7.634 0-13.846-6.917-13.846-15.42h5.833c0 5.287 3.595 9.587 8.013 9.587s8.013-4.3 8.013-9.586h5.833c0 8.502-6.211 15.419-13.846 15.419zM88.732 68.985c-7.636 0-13.846-6.917-13.846-15.42h5.833c0 5.287 3.594 9.587 8.013 9.587s8.012-4.3 8.012-9.586h5.834c0 8.502-6.212 15.419-13.846 15.419z"/>
                        </svg>
                        <p style="margin-top: 24px;">no slips available</p>
                        <p>for now</p>
                    </div>`;
};

function changeView(){
    let slipsData = JSON.parse(window.localStorage.getItem("slips"));

    if (slipsData && slipsData.length > 0) {
        slipsData.forEach((item, key) => {
            dispSlips(item, key, slipsData);
        });
    }else{
        dispEmpty();
    }
};

document.body.onload = () => {

    const startBtn = document.querySelector("#startGen");
    const getdataBtn = document.querySelector("#dispSlips");


    let socket = io();

    socket.on("connect", ()=>{
        socket.emit("connections", {data: "User am connected"});
    });

    socket.on("data", (data)=>{
        window.localStorage.clear();

        window.localStorage.setItem("slips", JSON.stringify(data.data));
        
        if(data.activity === "generation"){
            startBtn.classList.remove("loading")
        }
        changeView(); 
    });

    startBtn.addEventListener("click", ()=>{
        startBtn.classList.add("loading")
        socket.emit("generate", {start: true});
    });

    getdataBtn.addEventListener("click", ()=>{
        socket.emit("fetch", {get: true});
    })

}
