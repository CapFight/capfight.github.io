(function() {
    const original_CanvasRenderingContext2D_fillText = CanvasRenderingContext2D.prototype.fillText;
    let chatStatus = 0;
    let captchaStatus = 0;
    let morgen = 0;
    let fakeStatus = 0;
    let fCaptcha = 0;
    let mode = 0;
    let modeChange = 0;
    let paydayStatus = 0;
    let paydayHelp = 0;
    let paydayAutoStatus = 0;
    let nStatus = 0;
    let pressedN = 0;
    let reaction = 0;
    let firstSymbol = 0;
    let firstSymbolStatus = 0;
    let stopStatus = 0;
    let againPayday = 0;
    let paydayDo = 0;
    let paydayDone = 0;
    let zaprosFCaptchi = 0;
    let chatGenerator = 0;
    let chatTyped = [];
    let lastValue = 0;
    let chatSteps = null;
    let changedKey = 0;
    let changedKeyCode = 0;
    let changedKeyName = 0;
    let changedKeyCodeNeed = 0;
    let keyClicked = 0;
    let validKey = 0;
    let openCaptchaKeyOne = 69;
    let openCaptchaKeyTwo = 78;
    let modeFcaptchaRequired = 0;
    let rds = 0;
    let rms = 0;
    let recordArr = [];
    let captchaLagStatus = 0;
    let captchaLagHelp = 0;
    let captchaLagWaiting = 0;
    let zeroCaptchaStatus = 0;
    let zeroCaptchaHelp = 0;
    let captchaMinSize = 90;
    let captchaMaxSize = 140;
    let captchaTimer = -1;
    let firstSymbolTimer = -1;
    let captchaRecord = -1;
    let reactionTimer = -1;
    let paydayMode = 'normal';
    let botReactionTimes = {
        low: 2.0,
        medium: 1.0,
        hard: 0.7
    };
    let botAttempts = 0;
    let soundEnabled = true;

    function playRecordSound() {
        if (!soundEnabled) return;
        const sound = document.getElementById('recordSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Record sound error:'));
        }
    }
    let currentTheme = 'dark';
    const themes = {
        'dark': 'dark-theme',
        'light': 'light-theme',
        'blue': 'blue-theme',
        'green': 'green-theme'
    };

    function switchTheme() {
        const themeNames = Object.keys(themes);
        const currentIndex = themeNames.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeNames.length;
        currentTheme = themeNames[nextIndex];

        document.body.classList.remove('dark-theme', 'light-theme', 'blue-theme', 'green-theme');
        document.body.classList.add(themes[currentTheme]);

        typeChat(`Тема изменена на: ${currentTheme}`);
    }

    function newRecordX() {
        document.getElementById('headlineControl').innerText = 'Control [' + captchaRecord + ' s]';
        document.getElementById('record').style.display = 'block';
        document.getElementById('recordS').innerHTML = captchaRecord + ' s';
        playRecordSound();
        setTimeout(() => {
            document.getElementById('record').style.display = 'none';
        }, 1500)
    }

    function typeChat(text) {
        document.getElementById('chatArea').value = document.getElementById('chatArea').value + text + '\n';
        document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight;
    }

    function changeKey() {
        typeChat('Нажмите на клавиатуре клавишу, на которую желаете заменить');
        changedKeyCodeNeed = 1;
    }

    function modeN() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background = '';
            if (!chatGenerator) {
                document.getElementById('chatGen').style.display = 'none';
                document.getElementById('stopP').style.display = 'none';
                document.getElementById('modeN').classList.add('btnSelected');
                document.getElementById('paydayModes').style.display = 'none';
                if (mode) {
                    document.getElementById('modeP').classList.remove('btnSelected')
                };
                if (mode == 2) {
                    document.getElementById('modeF').classList.remove('btnSelected')
                };
                typeChat('Чтобы открыть капчу, нажмите N либо E, или просто напишите в чат команду /buybiz');
                mode = 0;
                document.getElementById('houseSale').style.display = 'none';
            };
            if (chatGenerator) {
                typeChat('Выключите генератор строк чата')
            }
        } else {
            typeChat('Ошибка переключения режимов, закройте окно с капчей или нажмите Stop')
        }
    }

    function modeP() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background = '';
            paydayAutoStatus = 0;
            document.getElementById('chatGen').style.display = 'inline-block';
            document.getElementById('stopP').style.display = 'inline-block';
            document.getElementById('modeP').classList.add('btnSelected');

            document.getElementById('paydayModes').style.display = 'inline-block';

            if (!mode) {
                document.getElementById('modeN').classList.remove('btnSelected')
            };
            if (mode == 2) {
                document.getElementById('modeF').classList.remove('btnSelected')
            };
            typeChat('Включен режим Payday, выберите сложность: Low/Medium/Hard/Normal');
            mode = 1;
            document.getElementById('houseSale').style.display = 'block';
            document.getElementById('homeNotGos').style.display = 'block';
            document.getElementById('homeGos').style.display = 'none';
        } else {
            typeChat('Ошибка переключения режимов, закройте окно с капчи')
        }
    }

    function modeF() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background = '';
            if (!chatGenerator) {
                document.getElementById('chatGen').style.display = 'none';
                document.getElementById('stopP').style.display = 'inline-block';
                document.getElementById('modeF').classList.add('btnSelected');
                document.getElementById('paydayModes').style.display = 'none';
                if (!mode) {
                    document.getElementById('modeN').classList.remove('btnSelected')
                };
                if (mode) {
                    document.getElementById('modeP').classList.remove('btnSelected')
                };
                mode = 2;
                document.getElementById('houseSale').style.display = 'none';

                typeChat('Включен режим зацикленной капчи. Нажмите N либо E, после ввода капчи сразу же откроется новая капча!')
            }
        } else {
            typeChat('Ошибка переключения режимов, закройте окно с капчи или нажмите кнопку Stop')
        }
    }

    function captchaLag() {
        if (mode < 2) {
            if (!captchaLagHelp) {
                if (captchaLagStatus) {
                    captchaLagStatus = 0;
                    captchaLagHelp = 1;
                    typeChat('Выключен режим лагов капчи(симуляция пинга)');
                    document.getElementById('captchaLag').classList.remove('btnSelected')
                }
            };
            if (!captchaLagHelp) {
                if (!captchaLagStatus) {
                    captchaLagStatus = 1;
                    captchaLagHelp = 1;
                    typeChat('Включен режим лагов капчи(симуляция пинга)');
                    document.getElementById('captchaLag').classList.add('btnSelected')
                }
            };
            captchaLagHelp = 0
        } else {
            typeChat('Ошибка режимов');
        }
    }

    function captchaLagged() {
        if (!captchaLagWaiting) {
            if (captchaLagStatus) {
                captchaOpenDelay = Math.floor(Math.random() * (250 - 10) + 10);
                setTimeout(captchaOpen, captchaOpenDelay);
                captchaLagWaiting = 1
            }
        };
        if (!captchaLagStatus) {
            captchaOpen()
        }
    }

    function zeroCaptchaX() {
        if (!zeroCaptchaHelp) {
            if (zeroCaptchaStatus) {
                zeroCaptchaStatus = 0;
                zeroCaptchaHelp = 1;
                typeChat('Капча с окончанием на 0 выключена');
            }
        };
        if (!zeroCaptchaHelp) {
            if (!zeroCaptchaStatus) {
                zeroCaptchaStatus = 1;
                zeroCaptchaHelp = 1;
                typeChat('Капча с окончанием на 0 включена');
            }
        };
        zeroCaptchaHelp = 0
    }

    function chatText() {
        let chatValue = document.getElementById('chatInpt').value;
        if (chatValue.trim() === '') return;

        chatTyped.push(chatValue);

        if (chatValue[0] == '/') {
            let commandValid = 0;
            if (chatValue == '/time') {
                time();
                commandValid = 1
            };
            if (chatValue == '/help') {
                typeChat('');
                typeChat('/help - помощь по командам');
                typeChat('/buybiz - купить бизнес(открыть капчу командой)');
                typeChat('/key - сбросить клавиши открытия капчи');
                typeChat('/about - о создателе');
                typeChat('/record - рекорды');
                typeChat('/clear - очистить чат');
                typeChat('/zero  - последняя цифра капчи 0');
                typeChat('/theme - сменить тему оформления');
                typeChat('');
                commandValid = 1
            };
            if (chatValue == '/clear') {
                document.getElementById('chatArea').value = '';
                commandValid = 1
            };
            if (chatValue == '/zero') {
                zeroCaptchaX();
                commandValid = 1
            };
            if (chatValue == '/about') {
                typeChat('Автор данного произведения: Luffich ');
                commandValid = 1
            };
            if (chatValue == '/record') {
                recordArr = recordArr.sort((a, b) => a - b);
                if (recordArr.length > 0) {
                    for (let i = 0; i < recordArr.length; i++) {
                        typeChat((i + 1) + ") " + recordArr[i] + "s")
                    }
                } else {
                    typeChat("Рекордов ещё нету!")
                }
                commandValid = 1
            };
            if (chatValue == '/theme') {
                switchTheme();
                commandValid = 1
            };
            if (chatValue == '/payday low') {
                setPaydayMode('low');
                commandValid = 1;
            };
            if (chatValue == '/payday medium') {
                setPaydayMode('medium');
                commandValid = 1;
            };
            if (chatValue == '/payday hard') {
                setPaydayMode('hard');
                commandValid = 1;
            };
            if (chatValue == '/payday normal') {
                setPaydayMode('normal');
                commandValid = 1;
            };
            if (chatValue == '/key') {
                typeChat('Клавиши капчи были сброшены, открыть капчу можно нажатием E или N');
                openCaptchaKeyOne = 115;
                commandValid = 1
            };
            if (chatValue == '/buybiz') {
                if (mode == 0) {
                    captchaLagged()
                };
                if (mode == 1) {
                    if (paydayStatus) {
                        captchaLagged()
                    };
                    if (!paydayStatus) {
                        typeChat('Сначала активируйте режим нажатием N')
                    }
                } else {
                    if (mode != 0)
                        typeChat('Данная команда доступна исключительно в режиме N');
                };
                commandValid = 1
            };
            if (commandValid == 0) {
                typeChat('[Ошибка] Неизвестная команда! Введите /help для просмотра доступных команд.')
            }
        } else {
            if (!zaprosFCaptchi) {
                const names = ['Avgust_Inmmayharti', 'Ne_Lames', 'Taro_Ledyanoy', 'Rin_Lovlya', 'Riff_Inmmayharti', 'Luffy_Taro', 'Taro_Mrachnaya'];
                let nameC = names[Math.floor(Math.random() * names.length)];
                let idChat = Math.floor(Math.random() * (1001 - 1) + 1);
                typeChat(nameC + '[' + idChat + '] говорит: ' + chatValue)
            }
        }

        document.getElementById('chatInpt').value = '';
    }

    function chatOpen() {
        chatStatus = 1;
        document.getElementById('chatInpt').style.display = 'block';
        document.getElementById('chatInpt').disabled = false;
        document.getElementById('chatInpt').focus();
    }

    function chatClose() {
        document.getElementById('chatInpt').style.display = 'none';
        document.getElementById('chatInpt').value = '';
        document.getElementById('chatInpt').disabled = true;
        chatStatus = 0;
        lastValue = 0;
        chatSteps = null;
    }

    function chatStr() {
        let chatStrValue = Math.floor(Math.random() * (20 - 1) + 1);
        let chatIdRand = Math.floor(Math.random() * (1001 - 1) + 1);
        let chatAIdRand = Math.floor(Math.random() * (1001 - 1) + 1);

        const names = ['Avgust_Inmmayharti', 'Ne_Lames', 'Taro_Ledyanoy', 'Rin_Lovlya', 'Riff_Inmmayharti', 'Luffy_Taro', 'Taro_Mrachnaya'];
        let nameCHR = names[Math.floor(Math.random() * names.length)];
        let nameCHAR = names[Math.floor(Math.random() * names.length)];

        if (chatStrValue == 1) {
            typeChat('Администратор ' + nameCHAR + '[' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] на 998 дней. Причина: ЧСП 13-GG');
        };
        if (chatStrValue == 2) {
            typeChat('Объявление: Куплю дом. Звоните 884-88-88. Отправил: ' + nameCHR + '[' + chatIdRand + ']');
        };
        if (chatStrValue == 3) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Куплю Brabus Rocket GTS с полным тюнингом');
        };
        if (chatStrValue == 4) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Продам дом №2861 25ккк');
        };
        if (chatStrValue == 5) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Продам дом в Бусаево тел 7777777');
        };
        if (chatStrValue == 6) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Дайте денег');
        };
        if (chatStrValue == 7) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Дайте денег бедному');
        };
        if (chatStrValue == 8) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: дайте на пропитание');
        };
        if (chatStrValue == 9) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Оставьте бездомному дедульке немного денег и вам вернется в 10 раз больше');
        };
        if (chatStrValue == 10) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Какой дом слетел в тот пд?');
        };
        if (chatStrValue == 11) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: какой бизак слетел то?');
        };
        if (chatStrValue == 12) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: АЛО ЧТО ЗА МИСЫ');
        };
        if (chatStrValue == 13) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: ХУЕСОС С АХК');
        };
        if (chatStrValue == 14) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Кто лох + в чат');
        };
        if (chatStrValue == 15) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Продам девственность. Звоните');
        };
        if (chatStrValue == 16) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Куплю дом в Ривере. Бюджет: 500.000.000');
        };
        if (chatStrValue == 17) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Ищу девушку для с/о. О себе: большой хуй');
        };
        if (chatStrValue == 18) {
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: Продам м/ц марки Yamaha R1. Цена договорная');
        };
        if (chatStrValue == 19) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: я ебал твой рот бубуубуб');
        };

        if (chatGenerator == 1) {
            let cZaderjka = Math.floor(Math.random() * (4000 - 1500) + 1500);
            setTimeout(chatStr, cZaderjka)
        }
    }

    function chatGen() {
        if (!chatGenerator) {
            typeChat('Генератор строк чата включен');
            chatGenerator = 1;
            document.getElementById('chatGen').classList.add('btnSelected');
            chatStr()
        } else {
            typeChat('Генератор строк чата выключен');
            chatGenerator = 0;
            document.getElementById('chatGen').classList.remove('btnSelected')
        }
    }

    function time() {
        let timePlayed = Math.floor(Math.random() * (60 - 1) + 1);
        let date = new Date();
        let dHours = date.getHours();
        let dMin = date.getMinutes();
        let dDate = date.getDate();
        let dMonth = date.getMonth();

        let months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

        document.getElementsByClassName('month')[0].innerHTML = dDate + ' ' + months[dMonth];
        document.getElementsByClassName('hours')[0].innerHTML = dHours + ':' + (dMin < 10 ? '0' + dMin : dMin);
        document.getElementsByClassName('playedGreen')[0].innerHTML = timePlayed + ' min';
        document.getElementsByClassName('time')[0].style.display = 'block';
        setTimeout(() => {
            document.getElementsByClassName('time')[0].style.display = 'none';
        }, 5000)
    }

    function setPaydayMode(mode) {
        paydayMode = mode;
        let modeText = '';
        switch (mode) {
            case 'low':
                modeText = 'Low (бот: 2.0s)';
                break;
            case 'medium':
                modeText = 'Medium (бот: 1.0s)';
                break;
            case 'hard':
                modeText = 'Hard (бот: 0.7s)';
                break;
            default:
                modeText = 'Normal';
                break;
        }
        typeChat(`Режим Payday установлен: ${modeText}`);
    }

    function botAttemptCapture() {
        if (paydayMode === 'normal') return;

        botAttempts++;
        let botTime = botReactionTimes[paydayMode];
        let randomDelay = Math.random() * 0.5 + botTime;

        setTimeout(() => {
            if (captchaStatus && paydayStatus) {
                typeChat(`Taro_Ledyanoy ахах выебал тебя за ${randomDelay.toFixed(2)}s! ебать ты медленный!`);
                captchaClose(0);
                paydayOff();
            }
        }, randomDelay * 1000);
    }

    function togglePaydayModes() {
        var dropdown = document.getElementById('paydayModeDropdown');
        if (dropdown.style.display === 'none') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }

    document.addEventListener('click', function(event) {
        var dropdown = document.getElementById('paydayModeDropdown');
        var toggleBtn = document.getElementById('paydayModeToggle');
        if (dropdown && dropdown.style.display === 'block' &&
            event.target !== toggleBtn &&
            !toggleBtn.contains(event.target) &&
            event.target !== dropdown &&
            !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    function payday() {

        typeChat('');
        typeChat('________Банковский чек________');
        typeChat('');
        typeChat('Депозит в банке: 666 руб.');
        typeChat('На банковском счету: 555.555 руб.');
        typeChat('Ваш игровой уровень: 66, очков опыта 77/111 (+5)');
        typeChat('Всего донат-очков: 66.666 (+26)');
        typeChat('______________________________');
        typeChat('');

        let numberRand = Math.floor(Math.random() * (1025 - 1) + 1);
        let classRand = Math.floor(Math.random() * (6 - 1) + 1);

        const names = ['Avgust_Inmmayharti', 'Ne_Lames', 'Taro_Ledyanoy', 'Rin_Lovlya', 'Riff_Inmmayharti', 'Luffy_Taro', 'Taro_Mrachnaya'];
        let name = names[Math.floor(Math.random() * names.length)];

        paydayAutoStatus = 1;
        reactionTimer = Date.now();

        paydayStatus = 1;
        paydayHelp = 0;
        document.getElementById('homeNotGos').style.display = 'none';
        document.getElementById('owner').innerHTML = name;
        document.getElementById('number').innerHTML = numberRand;
        document.getElementById('class').innerHTML = classRand;
        document.getElementById('numberG').innerHTML = numberRand;
        document.getElementById('classG').innerHTML = classRand;
        document.getElementById('homeGos').style.display = 'block';
        document.getElementById('payday').style.display = 'block';
        document.getElementsByClassName('time')[0].style.display = 'none';
        if (paydayMode !== 'normal') {
            typeChat(`Taro_Ledyanoy щас разьебет тебя капчей! У вас есть ${botReactionTimes[paydayMode]}s!`);
            botAttemptCapture();
        }
        setTimeout(() => {
            document.getElementById('payday').style.display = 'none';
        }, 4000)
    }

    function paydayGo() {
        if (mode) {
            if (!paydayDone) {
                paydayDo = 0;
                paydayHelp = 1;

                let zaderjka = Math.floor(Math.random() * (2500 - 900) + 900);
                setTimeout(payday, zaderjka);

                nStatus = 1;
                modeChange = 1;
                againPayday = 1;
                paydayDone = 1
            }
        }
    }

    function paydayOff() {
        paydayDone = 0;
        paydayStatus = 0;
        nStatus = 0;
        pressedN = 0;
        document.getElementById('homeNotGos').style.display = 'block';
        document.getElementById('homeGos').style.display = 'none';
        modeChange = 0;
        stopStatus = 0;
        paydayAutoStatus = 0;
        againPayday = 0;
    }

    function firstTime() {
        let getInput = document.getElementById('megasuperbebra').value;
        let inputLength = getInput.length;
        if (!firstSymbolStatus) {
            if (inputLength == 1) {
                if ((getInput > -1) && (getInput < 10)) {
                    firstSymbolStatus = 1;
                    firstSymbol = parseFloat(((Date.now() - firstSymbolTimer) / 1000).toFixed(3))
                }
            }
        }
    }

    function stopP() {
        if (mode == 1) {
            stopStatus = 1;
            paydayAutoStatus = 0;
            typeChat('Режим Payday остановлен');
            againPayday = 0;
            paydayDo = 1
            if (chatGenerator) {
                chatGenerator = 0;
                document.getElementById('chatGen').classList.remove('btnSelected');
                typeChat('Генератор строк чата выключен');
            }
            document.getElementById('paydayModes').style.display = 'none';
            paydayOff();
            if (captchaStatus) {
                captchaClose(0);
            }
            document.getElementById('houseSale').style.display = 'none';
            modeN();
        };
        if (mode == 2) {
            if (modeFcaptchaRequired) {
                modeFcaptchaRequired = 0;
                typeChat('Цикл остановлен');
                captchaClose(0);
            }
            modeN();
        }
        document.getElementById('modeP').classList.remove('btnSelected');
        document.getElementById('modeF').classList.remove('btnSelected');
        mode = 0;
        modeChange = 0;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function captchaOpen() {
        captchaLagWaiting = 0;
        captchaStatus = 1;
        modeChange = 1;
        captchaTimer = firstSymbolTimer = Date.now();
        if (paydayStatus && reactionTimer != -1) {
            reaction = parseFloat(((Date.now() - reactionTimer) / 1000).toFixed(3))
        }
        firstSymbolStatus = 0;

        if (fakeStatus == 1) {
            morgen = fCaptcha
        } else {
            morgen = Math.floor(Math.random() * (100000 - 10000) + 10000)
        };

        if (!fakeStatus && zeroCaptchaStatus) {
            morgen = Math.floor(Math.random() * (10000 - 1000) + 1000) * 10
        };

        let canvas = document.getElementById('captchaCanvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 365;
        canvas.height = 100;
        ctx.clearRect(0, 0, 365, 100);

        ctx.fillStyle = "#5b7c87";
        ctx.fillRect(0, 0, 365, 100);

        let captchaText = morgen + "";

        for (let i = 0; i < captchaText.length; i++) {
            ctx.save();

            let baseX = 70 + i * 60;
            let baseY = 55;

            let x = baseX + (Math.random() - 0.5) * 12;
            let y = baseY + (Math.random() - 0.5) * 10;
            let rotation = (Math.random() - 0.5) * 0.15;

            let fontSize = 90 + Math.random() * 30;

            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = "#222E39";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.fillText(captchaText[i], 0, 0);
            ctx.restore();
        }

        document.getElementsByClassName('captchaDiv')[0].style.display = 'block';
        document.getElementsByClassName('typeDiv')[0].style.display = 'block';
        captchaTimer = firstSymbolTimer = Date.now();
        document.getElementById('megasuperbebra').disabled = false;
        document.getElementById('megasuperbebra').focus();
    }

    function captchaClose(cType) {
        firstSymbolStatus = 0;
        modeChange = 0;
        captchaStatus = 0;
        let captchaValid = 0;
        let timeReact = '';
        let cValue = document.getElementById('megasuperbebra').value;
        let captchaTime = parseFloat(((Date.now() - captchaTimer) / 1000).toFixed(3));
        let captchaData = cValue;

        if (!localStorage.getItem("xxAllCaptcha")) localStorage.setItem("xxAllCaptcha", "0");
        if (!localStorage.getItem("xxGoodCaptcha")) localStorage.setItem("xxGoodCaptcha", "0");
        if (!localStorage.getItem("xxCounterInputs")) localStorage.setItem("xxCounterInputs", "0");
        if (!localStorage.getItem("xxCounterFirstSymb")) localStorage.setItem("xxCounterFirstSymb", "0");
        if (!localStorage.getItem("xxAllInputs")) localStorage.setItem("xxAllInputs", "0");
        if (!localStorage.getItem("xxAllFirstSymb")) localStorage.setItem("xxAllFirstSymb", "0");

        if (cType == 1) {
            captchaValid = (morgen + "" == captchaData);

            let allCaptcha = parseInt(localStorage.getItem("xxAllCaptcha")) + 1;
            localStorage.setItem("xxAllCaptcha", allCaptcha);

            if (captchaValid) {
                let goodCaptcha = parseInt(localStorage.getItem("xxGoodCaptcha")) + 1;
                localStorage.setItem("xxGoodCaptcha", goodCaptcha);

                localStorage.setItem("xxCounterInputs", parseInt(localStorage.getItem("xxCounterInputs")) + 1);
                localStorage.setItem("xxCounterFirstSymb", parseInt(localStorage.getItem("xxCounterFirstSymb")) + 1);
                localStorage.setItem("xxAllInputs", parseFloat(localStorage.getItem("xxAllInputs")) + captchaTime);
                localStorage.setItem("xxAllFirstSymb", parseFloat(localStorage.getItem("xxAllFirstSymb")) + firstSymbol);

                document.getElementById("average").innerText = `Средний ввод: ${(localStorage.getItem("xxAllInputs") / localStorage.getItem("xxCounterInputs")).toFixed(3)}s`;
                document.getElementById("averageFirstSymb").innerText = `Средний ввод первого символа: ${(localStorage.getItem("xxAllFirstSymb") / localStorage.getItem("xxCounterFirstSymb")).toFixed(3)}s`;
            }

            let successRate = Math.trunc((parseInt(localStorage.getItem("xxGoodCaptcha")) / parseInt(localStorage.getItem("xxAllCaptcha"))) * 100);
            document.getElementById("goodCaptcha").innerText = `Процент верных капч: ${successRate}%`;

            if (paydayMode !== 'normal' && paydayStatus && captchaValid) {
                if (captchaTime < botReactionTimes[paydayMode]) {
                    typeChat(`Ты обогнал великого Taro_Ledyanoy! Ваше время: ${captchaTime}s`);
                } else {
                    typeChat(`Taro_Ledyanoy чет на изи тебя выебал! Ваше время: ${captchaTime}s`);
                }
            }
        }

        document.getElementsByClassName('captchaDiv')[0].style.display = 'none';
        document.getElementsByClassName('typeDiv')[0].style.display = 'none';
        document.getElementById('megasuperbebra').value = null;
        document.getElementById('megasuperbebra').disabled = true;

        let canvas = document.getElementById("captchaCanvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode == 1) {
            timeReact = ", открыта за " + reaction + "s";
            paydayOff();
            if (!stopStatus) {
                if (!paydayDo) {
                    paydayGo()
                }
            }
        };

        if (cType == 1) {
            let isRecord = false;
            if (captchaValid) {
                if (captchaTime < captchaRecord || captchaRecord == -1) {
                    isRecord = true;
                    captchaRecord = captchaTime;
                    newRecordX();
                    recordArr.push(captchaRecord);
                }
            };

            typeChat((isRecord ? "[РЕКОРД] " : "") + "Капча введена " + (captchaValid ? "" : "не") + "верно (" + morgen + '|' + captchaData + ') за ' + captchaTime + "s (первая цифра: " + (firstSymbol != 0 ? firstSymbol + "s" : "нет") + (mode == 1 ? timeReact : "") + ")");
        }

        firstSymbol = 0;
        if (mode == 2) {
            if (modeFcaptchaRequired) {
                captchaOpen();
            }
        }
    }

    function controlHide() {
        document.getElementById('control').style.display = 'none';
        document.getElementById('openControl').style.display = 'block';
    }

    function controlOpen() {
        document.getElementById('control').style.display = 'block';
        document.getElementById('openControl').style.display = 'none';
    }

    var ball = document.getElementById('houseSale');
    ball.onmousedown = function(e) {
        var coords = getCoords(ball);
        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        ball.style.position = 'absolute';
        document.body.appendChild(ball);

        function moveAt(e) {
            ball.style.left = e.pageX - shiftX + 'px';
            ball.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        ball.onmouseup = function() {
            document.onmousemove = null;
            ball.onmouseup = null;
        };
    };

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    window.onload = function() {
        document.getElementById('openControl').onclick = controlOpen;
        document.getElementById('hideControl').onclick = controlHide;
        document.getElementById('modeN').onclick = modeN;
        document.getElementById('modeP').onclick = modeP;
        document.getElementById('paydayModeToggle').onclick = togglePaydayModes;
        document.getElementById('paydayLow').onclick = function() {
            setPaydayMode('low');
            document.getElementById('paydayModeDropdown').style.display = 'none';
        };
        document.getElementById('paydayMedium').onclick = function() {
            setPaydayMode('medium');
            document.getElementById('paydayModeDropdown').style.display = 'none';
        };
        document.getElementById('paydayHard').onclick = function() {
            setPaydayMode('hard');
            document.getElementById('paydayModeDropdown').style.display = 'none';
        };
        document.getElementById('paydayNormal').onclick = function() {
            setPaydayMode('normal');
            document.getElementById('paydayModeDropdown').style.display = 'none';
        };
        document.getElementById('modeF').onclick = modeF;
        document.getElementById('captchaLag').onclick = captchaLag;
        document.getElementById('stopP').onclick = stopP;
        document.getElementById('chatGen').onclick = chatGen;
        document.getElementById('changeKey').onclick = changeKey;
        document.getElementById('themeToggle').onclick = switchTheme;
        document.getElementById('send').onclick = function() {
            captchaClose(1)
        };
        document.getElementById('cancel').onclick = function() {
            captchaClose(0)
        };
        document.querySelector('#advertisement button').onclick = function() {
            document.getElementById('advertisement').style.display = 'none';
        };

        let allCaptcha = parseInt(localStorage.getItem("xxAllCaptcha") || "0");
        let goodCaptcha = parseInt(localStorage.getItem("xxGoodCaptcha") || "0");
        let successRate = allCaptcha > 0 ? Math.trunc((goodCaptcha / allCaptcha) * 100) : 0;
        document.getElementById("goodCaptcha").innerText = `Процент верных капч: ${successRate}%`;
        document.getElementById("average").innerText = `Средний ввод: ${((localStorage.getItem("xxAllInputs") || 0) / (localStorage.getItem("xxCounterInputs") || 1)).toFixed(3)}s`;
        document.getElementById("averageFirstSymb").innerText = `Средний ввод первого символа: ${((localStorage.getItem("xxAllFirstSymb") || 0) / (localStorage.getItem("xxCounterFirstSymb") || 1)).toFixed(3)}s`;

        document.getElementById('megasuperbebra').oninput = firstTime;

        document.getElementById('chatInpt').addEventListener('keyup', function(e) {
            if (e.keyCode === 38) {
                if (chatSteps == null) {
                    lastValue = document.getElementById('chatInpt').value;
                    chatSteps = chatTyped.length;
                };
                if (chatSteps > 0) {
                    chatSteps = chatSteps - 1;
                };
                if (chatTyped.length > 0) {
                    document.getElementById('chatInpt').value = chatTyped[chatSteps];
                }
            };
            if (e.keyCode === 40) {
                if (chatSteps <= chatTyped.length - 1) {
                    chatSteps = chatSteps + 1;
                    document.getElementById('chatInpt').value = chatTyped[chatSteps];
                    if (chatSteps == chatTyped.length) {
                        document.getElementById('chatInpt').value = lastValue;
                    }
                }
            };
            if (e.keyCode === 27) {
                chatClose();
            };
            if (e.keyCode === 13) {
                chatText();
                chatClose();
            };
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 93 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
                e.preventDefault();
                return false;
            }

            if (changedKeyCodeNeed) {
                e.preventDefault();
                let blockedKeys = [17, 16, 20, 9, 8, 27, 32, 91, 18, 78];
                if (blockedKeys.indexOf(e.keyCode) === -1) {
                    changedKeyCode = e.keyCode;
                    changedKeyName = e.key;
                    typeChat('Кнопка открытия капчи была изменена (' + e.key + '), также открыть капчу можно нажатием на N');
                    openCaptchaKeyOne = changedKeyCode;
                    changedKeyCodeNeed = 0;
                } else {
                    typeChat('Неверная клавиша, попробуйте еще раз');
                }
                return;
            }

            if (e.keyCode === 84 && !chatStatus && !captchaStatus) {
                e.preventDefault();
                chatOpen();
                return;
            }

            if ((e.keyCode === openCaptchaKeyOne || e.keyCode === openCaptchaKeyTwo) && !captchaStatus && !chatStatus) {
                e.preventDefault();
                if (mode == 0) {
                    captchaLagged();
                } else if (mode == 1) {
                    if (!paydayStatus && !paydayHelp) {
                        if (!paydayAutoStatus) {
                            paydayGo();
                        }
                    } else if (paydayStatus) {
                        captchaLagged();
                    } else {
                        if (nStatus) {
                            if (pressedN > -1) {
                                let variant = Math.floor(Math.random() * (4 - 1) + 1);
                                if (variant != 3) {
                                    typeChat('[Ошибка] Не флуди!');
                                } else {
                                    typeChat('[Ошибка] Этот дом уже куплен!');
                                }
                            };
                            pressedN = pressedN + 1;
                        }
                    }
                } else if (mode == 2) {
                    if (!modeFcaptchaRequired) {
                        captchaOpen();
                        modeFcaptchaRequired = 1;
                    }
                }
            }

            if (captchaStatus == 1 && e.keyCode === 13) {
                e.preventDefault();
                captchaClose(1);
            }

            if (captchaStatus == 1 && e.keyCode === 27) {
                e.preventDefault();
                captchaClose(0);
            }
        });

        String.prototype.slice = function() {
            return "cheat";
        };
        String.prototype.replace = function() {
            return "cheat";
        };

        modeN();
        typeChat("Добро пожаловать!");
        typeChat("Автор: Luffich");
        typeChat("Используйте /help для списка команд");

        document.getElementById('chatInpt').style.display = 'none';
        document.getElementById('chatInpt').disabled = true;
        document.getElementById('chatVisible').style.display = 'block';
    };
})();
