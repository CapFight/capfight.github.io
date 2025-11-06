(function() {
    const original_CanvasRenderingContext2D_fillText = CanvasRenderingContext2D.prototype.fillText;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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
    let changedKeyCode = 0;
    let changedKeyName = 0;
    let changedKeyCodeNeed = 0;
    let openCaptchaKeyOne = 69;
    let openCaptchaKeyTwo = 78;
    let modeFcaptchaRequired = 0;
    let rds = 0;
    let rms = 0;
    let recordArr = [];
    let captchaLagStatus = 0;
    let captchaLagHelp = 0;
    let captchaLagWaiting = 0;
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
    let autoZeroStatus = 0;
    let firstSymbolTrainingStatus = 0;
    let firstSymbolTrainingHelp = 0;
    let xxAllCaptchaNormal = 0;
    let xxGoodCaptchaNormal = 0;
    let xxCounterInputsNormal = 0;
    let xxCounterFirstSymbNormal = 0;
    let xxAllInputsNormal = 0;
    let xxAllFirstSymbNormal = 0;

    let xxAllCaptchaFirstSymbol = 0;
    let xxGoodCaptchaFirstSymbol = 0;
    let xxCounterInputsFirstSymbol = 0;
    let xxAllInputsFirstSymbol = 0;
    let captchaRecordNormal = -1;
    let captchaRecordFirstSymbol = -1;

    function autoZero() {
        if (!autoZeroStatus) {
            autoZeroStatus = 1;
            typeChat('AutoZero включен - капча всегда будет заканчиваться на 0');
            document.getElementById('autoZero').classList.add('btnSelected');
        } else {
            autoZeroStatus = 0;
            typeChat('AutoZero выключен');
            document.getElementById('autoZero').classList.remove('btnSelected');
        }
    }

    function firstSymbolTraining() {
        if (!firstSymbolTrainingStatus) {
            firstSymbolTrainingStatus = 1;
            typeChat('Тренировка первого символа включена - вводите только первую цифру');
            document.getElementById('firstSymbolTrain').classList.add('btnSelected');
        } else {
            firstSymbolTrainingStatus = 0;
            typeChat('Тренировка первого символа выключена');
            document.getElementById('firstSymbolTrain').classList.remove('btnSelected');
        }
        updateStatisticsDisplay();
    }

    function updateStatisticsDisplay() {
        if (firstSymbolTrainingStatus) {
            let firstSymbolSuccessRate = xxAllCaptchaFirstSymbol > 0 ?
                Math.trunc((xxGoodCaptchaFirstSymbol / xxAllCaptchaFirstSymbol) * 100) : 0;

            let avgFirstSymbolTime = xxCounterInputsFirstSymbol > 0 ?
                (xxAllInputsFirstSymbol / xxCounterInputsFirstSymbol).toFixed(3) : "0.000";

            document.getElementById("goodCaptcha").innerText = `Процент верных 1-х символов: ${firstSymbolSuccessRate}%`;
            document.getElementById("average").innerText = `Средний ввод 1-го символа: ${avgFirstSymbolTime}s`;
            document.getElementById("averageFirstSymb").innerText = `Тренировка первого символа`;

            document.getElementById('headlineControl').innerText =
                captchaRecordFirstSymbol == -1 ? 'Control [--- s]' : `Control [${captchaRecordFirstSymbol} s]`;
        } else {
            let successRate = xxAllCaptchaNormal > 0 ?
                Math.trunc((xxGoodCaptchaNormal / xxAllCaptchaNormal) * 100) : 0;

            let avgInputTime = xxCounterInputsNormal > 0 ?
                (xxAllInputsNormal / xxCounterInputsNormal).toFixed(3) : "0.000";

            let avgFirstSymbTime = xxCounterFirstSymbNormal > 0 ?
                (xxAllFirstSymbNormal / xxCounterFirstSymbNormal).toFixed(3) : "0.000";

            document.getElementById("goodCaptcha").innerText = `Процент верных капч: ${successRate}%`;
            document.getElementById("average").innerText = `Средний ввод: ${avgInputTime}s`;
            document.getElementById("averageFirstSymb").innerText = `Средний ввод первого символа: ${avgFirstSymbTime}s`;

            document.getElementById('headlineControl').innerText =
                captchaRecordNormal == -1 ? 'Control [--- s]' : `Control [${captchaRecordNormal} s]`;
        }
    }

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
        if (firstSymbolTrainingStatus) {
            document.getElementById('headlineControl').innerText = 'Control [' + captchaRecordFirstSymbol + ' s]';
            document.getElementById('recordS').innerHTML = captchaRecordFirstSymbol + ' s';
        } else {
            document.getElementById('headlineControl').innerText = 'Control [' + captchaRecordNormal + ' s]';
            document.getElementById('recordS').innerHTML = captchaRecordNormal + ' s';
        }
        document.getElementById('record').style.display = 'block';
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

                document.getElementById('paydayModeContainer').style.display = 'none';

                document.getElementById('control').classList.remove('payday-mode');
                document.getElementById('modeF').style.display = 'inline-block';
                document.getElementById('autoZero').style.display = 'inline-block';
                document.getElementById('firstSymbolTrain').style.display = 'inline-block';
                document.getElementById('captchaLag').style.display = 'inline-block';
                document.body.classList.remove('payday-mode', 'fast-mode');

                if (autoZeroStatus) {
                    document.getElementById('autoZero').classList.add('btnSelected');
                } else {
                    document.getElementById('autoZero').classList.remove('btnSelected');
                }

                if (mode) {
                    document.getElementById('modeP').classList.remove('btnSelected')
                };
                if (mode == 2) {
                    document.getElementById('modeF').classList.remove('btnSelected')
                };

                if (isMobile) {
                    document.getElementById('mobileStopBtn').style.display = 'none';
                }

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

            document.getElementById('paydayModeContainer').style.display = 'block';

            document.getElementById('control').classList.add('payday-mode');
            document.getElementById('modeF').style.display = 'none';
            document.getElementById('firstSymbolTrain').style.display = 'none';

            document.getElementById('autoZero').style.display = 'inline-block';
            document.getElementById('captchaLag').style.display = 'inline-block';
            document.body.classList.add('payday-mode');
            document.body.classList.remove('fast-mode');

            if (autoZeroStatus) {
                document.getElementById('autoZero').classList.add('btnSelected');
            } else {
                document.getElementById('autoZero').classList.remove('btnSelected');
            }

            if (captchaLagStatus) {
                document.getElementById('captchaLag').classList.add('btnSelected');
            } else {
                document.getElementById('captchaLag').classList.remove('btnSelected');
            }

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

                document.getElementById('paydayModeContainer').style.display = 'none';

                document.getElementById('control').classList.remove('payday-mode');
                document.getElementById('modeF').style.display = 'inline-block';
                document.getElementById('autoZero').style.display = 'inline-block';
                document.getElementById('firstSymbolTrain').style.display = 'inline-block';
                document.getElementById('captchaLag').style.display = 'inline-block';
                document.body.classList.add('fast-mode');
                document.body.classList.remove('payday-mode');

                if (autoZeroStatus) {
                    document.getElementById('autoZero').classList.add('btnSelected');
                } else {
                    document.getElementById('autoZero').classList.remove('btnSelected');
                }

                if (!mode) {
                    document.getElementById('modeN').classList.remove('btnSelected')
                };
                if (mode) {
                    document.getElementById('modeP').classList.remove('btnSelected')
                };

                if (isMobile) {
                    document.getElementById('mobileStopBtn').style.display = 'block';
                }

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
            if (captchaLagStatus) {
                captchaLagStatus = 0;
                typeChat('Выключен режим лагов капчи(симуляция пинга)');
                document.getElementById('captchaLag').classList.remove('btnSelected');
                if (mode == 1) {
                    document.getElementById('captchaLag').style.display = 'none';
                }
            } else {
                captchaLagStatus = 1;
                typeChat('Включен режим лагов капчи(симуляция пинга)');
                document.getElementById('captchaLag').classList.add('btnSelected');
                if (mode == 1) {
                    document.getElementById('captchaLag').style.display = 'inline-block';
                }
            }
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
                typeChat('/buybiz - купить бизнес (То же самое как и N / E)');
                typeChat('/key - сбросить клавиши открытия капчи');
                typeChat('/record - рекорды');
                typeChat('/clear - очистить чат');
                typeChat('/zero - последняя цифра капчи 0 (AutoZero)');
				typeChat('/about - о создателе');
                typeChat('/theme - сменить тему оформления');
                typeChat('');
                commandValid = 1
            };
            if (chatValue == '/clear') {
                document.getElementById('chatArea').value = '';
                commandValid = 1
            };
            if (chatValue == '/zero') {
                autoZero();
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
                    if (mode != 0) typeChat('Данная команда доступна исключительно в режиме N');
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
        let chatStrValue = Math.floor(Math.random() * (49 - 1) + 1);
        let chatIdRand = Math.floor(Math.random() * (1001 - 1) + 1);
        let chatAIdRand = Math.floor(Math.random() * (1001 - 1) + 1);
        const names = ['Avgust_Inmmayharti', 'Ne_Lames', 'Taro_Ledyanoy', 'Rin_Lovlya', 'Riff_Inmmayharti', 'Luffy_Taro', 'Taro_Mrachnaya'];
        let nameCHR = names[Math.floor(Math.random() * names.length)];
        let nameCHAR = names[Math.floor(Math.random() * names.length)];
        if (chatStrValue == 1) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] на 998 дней. Причина: ЧСП 13-GG');
        };
        if (chatStrValue == 2) {
            typeChat('Объявление: Куплю дом. Звоните 884-88-88. Отправил: ' + nameCHR + ' [' + chatIdRand + ']');
        };
        if (chatStrValue == 3) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю Brabus Rocket GTS с полным тюнингом');
        };
        if (chatStrValue == 4) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам дом №2861 25ккк');
        };
        if (chatStrValue == 5) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам дом в Бусаево тел 7777777');
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
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам девственность. Звоните');
        };
        if (chatStrValue == 16) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю дом в Ривере. Бюджет: 500.000.000');
        };
        if (chatStrValue == 17) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Ищу девушку для с/о. О себе: большой хуй');
        };
        if (chatStrValue == 18) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам м/ц марки Yamaha R1. Цена договорная');
        };
        if (chatStrValue == 19) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: я ебал твой рот бубуубуб');
        };
        if (chatStrValue == 20) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] на 30 дней. Причина: Оскорбление администрации');
        };
        if (chatStrValue == 21) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] на 7 дней. Причина: Масс DM (DeathMatch)');
        };
        if (chatStrValue == 22) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] выдал предупреждение игроку ' + nameCHR + '[' + chatIdRand + ']. Причина: Нецензурная лексика');
        };
        if (chatStrValue == 23) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю аккаунт с 100 лвл. Бюджет 1к руб');
        };
        if (chatStrValue == 24) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам девушку в рабство. Работает, не грубит');
        };
        if (chatStrValue == 25) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: А можно мне админку? Я хорошо себя буду вести');
        };
        if (chatStrValue == 26) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Ребята, кто видел мой самолет? Припарковал и пропал');
        };
        if (chatStrValue == 27) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Продам гараж с трупом. Цена: 500к. Не спрашивайте чей');
        };
        if (chatStrValue == 28) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Ищу работу киллером. Опыт: GTA SA MP');
        };
        if (chatStrValue == 29) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Админы спят? Можно немного почитерить?');
        };
        if (chatStrValue == 30) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю паспорт гражданина РФ. Цена до 100к');
        };
        if (chatStrValue == 31) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Кто подвезет до больницы? Пулю в жопе носить неудобно');
        };
        if (chatStrValue == 32) {
            typeChat('Объявление: Сниму квартиру без соседей и вопросов. ' + nameCHR + ' [' + chatIdRand + ']');
        };
        if (chatStrValue == 33) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Продам историю болезней. Коллекционный экземпляр');
        };
        if (chatStrValue == 34) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Ищу свидетелей ДТП на проспекте Ленина. Белая BMW');
        };
        if (chatStrValue == 35) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: А вы знали, что администраторы - это миф?');
        };
        if (chatStrValue == 36) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] выдал 100.000.000$ игроку ' + nameCHR + '[' + chatIdRand + '] за помощь проекту');
        };
        if (chatStrValue == 37) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Кто-нибудь, заберите моего кота! Он опять на стриме');
        };
        if (chatStrValue == 38) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам душу дьяволу. Предложения в лс');
        };
        if (chatStrValue == 39) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Нашел чемодан с деньгами. Ищу владельца по приметам: 5кг кокаина внутри');
        };
        if (chatStrValue == 40) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю права категории "вертолет". Наличными');
        };
        if (chatStrValue == 41) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: А можно я буду играть за полицию? Я уже форму купил');
        };
        if (chatStrValue == 42) {
            typeChat('Объявление: Услуги экзорциста. Изгоняю демонов, админов и прочую нечисть. ' + nameCHR + ' [' + chatIdRand + ']');
        };
        if (chatStrValue == 43) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Продам секрет бессмертия. Цена: ваша душа');
        };
        if (chatStrValue == 44) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Ищу попутчика до Арзамаса. Срочно!');
        };
        if (chatStrValue == 45) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: Кто-нибудь, вызовите скорую! У меня икота уже 3 дня');
        };
        if (chatStrValue == 46) {
            typeChat('Администратор ' + nameCHAR + ' [' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] навсегда. Причина: Слишком умный');
        };
        if (chatStrValue == 47) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Продам историю о том, как я встретил вашу маму');
        };
        if (chatStrValue == 48) {
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: А вы не знаете, как убрать труп из багажника? Друг спрашивает');
        };
        if (chatStrValue == 49) {
            typeChat('[VIP] ' + nameCHR + ' [' + chatIdRand + ']: Куплю алиби на вчерашний вечер. Цена договорная');
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
        var container = document.getElementById('paydayModeContainer');

        if (dropdown && dropdown.style.display === 'block' &&
            event.target !== toggleBtn &&
            !toggleBtn.contains(event.target) &&
            event.target !== dropdown &&
            !dropdown.contains(event.target) &&
            event.target !== container &&
            !container.contains(event.target)) {
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

        paydayAutoStatus = 0;
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
        let getInput = document.getElementById('shlepacomeback').value;
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
            paydayDo = 1;
            if (chatGenerator) {
                chatGenerator = 0;
                document.getElementById('chatGen').classList.remove('btnSelected');
                typeChat('Генератор строк чата выключен');
            }

            document.getElementById('paydayModeContainer').style.display = 'none';

            document.getElementById('control').classList.remove('payday-mode');
            document.getElementById('modeF').style.display = 'inline-block';
            document.getElementById('autoZero').style.display = 'inline-block';
            document.getElementById('firstSymbolTrain').style.display = 'inline-block';
            document.getElementById('captchaLag').style.display = 'inline-block';
            document.body.classList.remove('payday-mode', 'fast-mode');

            if (autoZeroStatus) {
                document.getElementById('autoZero').classList.add('btnSelected');
            } else {
                document.getElementById('autoZero').classList.remove('btnSelected');
            }
            if (captchaLagStatus) {
                document.getElementById('captchaLag').classList.add('btnSelected');
            } else {
                document.getElementById('captchaLag').classList.remove('btnSelected');
            }

            if (isMobile) {
                document.getElementById('mobileStopBtn').style.display = 'none';
            }

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

            if (isMobile) {
                document.getElementById('mobileStopBtn').style.display = 'none';
            }

            modeN();
        }

        if (firstSymbolTrainingStatus) {
            firstSymbolTrainingStatus = 0;
            document.getElementById('firstSymbolTrain').classList.remove('btnSelected');
            typeChat('Тренировка первого символа выключена');
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
        if (isMobile) document.body.classList.add('captcha-open');
        captchaLagWaiting = 0;
        captchaStatus = 1;
        modeChange = 1;
        captchaTimer = firstSymbolTimer = Date.now();
        if (paydayStatus && reactionTimer != -1) {
            reaction = parseFloat(((Date.now() - reactionTimer) / 1000).toFixed(3))
        }
        firstSymbolStatus = 0;

        if (fakeStatus == 1) {
            morgen = fCaptcha;
        } else if (firstSymbolTrainingStatus) {
            morgen = Math.floor(Math.random() * (10 - 1) + 1);
        } else {
            morgen = Math.floor(Math.random() * (100000 - 10000) + 10000);

            if (autoZeroStatus) {
                morgen = Math.floor(morgen / 10) * 10;
            }
        }

        let canvas = document.getElementById('captchaCanvas');
        let ctx = canvas.getContext('2d');

        canvas.width = 365;
        canvas.height = 100;

        ctx.clearRect(0, 0, 340, 100);
        ctx.fillStyle = "#5b7c87";
        ctx.fillRect(0, 0, 340, 100);

        let captchaText = morgen + "";

        if (firstSymbolTrainingStatus) {
            let digit = parseInt(captchaText[0]);
            let posX = canvas.width / 2;
            let posY = canvas.height / 2;
            drawSevenSegmentDigit(ctx, digit, posX, posY, 80);
        } else {
            for (let i = 0; i < 5; i++) {
                let digit = captchaText[i];
                let posX = 50 + i * 65;
                let posY = canvas.height / 2;
                drawSevenSegmentDigit(ctx, parseInt(digit), posX, posY, 70);
            }
        }

        document.getElementsByClassName('captchaDiv')[0].style.display = 'block';
        document.getElementsByClassName('typeDiv')[0].style.display = 'block';
        captchaTimer = firstSymbolTimer = Date.now();
        document.getElementById('shlepacomeback').disabled = false;
        document.getElementById('shlepacomeback').focus();
    }

    function drawSevenSegmentDigit(ctx, digit, x, y, size) {
        const segments = {
            0: [1, 1, 1, 1, 1, 1, 0],
            1: [0, 1, 1, 0, 0, 0, 0],
            2: [1, 1, 0, 1, 1, 0, 1],
            3: [1, 1, 1, 1, 0, 0, 1],
            4: [0, 1, 1, 0, 0, 1, 1],
            5: [1, 0, 1, 1, 0, 1, 1],
            6: [1, 0, 1, 1, 1, 1, 1],
            7: [1, 1, 1, 0, 0, 0, 0],
            8: [1, 1, 1, 1, 1, 1, 1],
            9: [1, 1, 1, 1, 0, 1, 1]
        };

        const segmentState = segments[digit] || [0, 0, 0, 0, 0, 0, 0];

        const segWidth = size * 0.16;
        const segLength = size * 0.7;

        ctx.fillStyle = "#222E39";
        ctx.strokeStyle = "#222E39";
        ctx.lineWidth = segWidth;
        ctx.lineCap = 'round';

        if (segmentState[0]) {
            ctx.beginPath();
            ctx.moveTo(x - segLength / 2 + segWidth / 2, y - size / 2 + segWidth / 2);
            ctx.lineTo(x + segLength / 2 - segWidth / 2, y - size / 2 + segWidth / 2);
            ctx.stroke();
        }

        if (segmentState[1]) {
            ctx.beginPath();
            ctx.moveTo(x + segLength / 2 - segWidth / 2, y - size / 2 + segWidth);
            ctx.lineTo(x + segLength / 2 - segWidth / 2, y - segWidth / 2);
            ctx.stroke();
        }

        if (segmentState[2]) {
            ctx.beginPath();
            ctx.moveTo(x + segLength / 2 - segWidth / 2, y + segWidth / 2);
            ctx.lineTo(x + segLength / 2 - segWidth / 2, y + size / 2 - segWidth);
            ctx.stroke();
        }

        if (segmentState[3]) {
            ctx.beginPath();
            ctx.moveTo(x - segLength / 2 + segWidth / 2, y + size / 2 - segWidth / 2);
            ctx.lineTo(x + segLength / 2 - segWidth / 2, y + size / 2 - segWidth / 2);
            ctx.stroke();
        }

        if (segmentState[4]) {
            ctx.beginPath();
            ctx.moveTo(x - segLength / 2 + segWidth / 2, y + segWidth / 2);
            ctx.lineTo(x - segLength / 2 + segWidth / 2, y + size / 2 - segWidth);
            ctx.stroke();
        }

        if (segmentState[5]) {
            ctx.beginPath();
            ctx.moveTo(x - segLength / 2 + segWidth / 2, y - size / 2 + segWidth);
            ctx.lineTo(x - segLength / 2 + segWidth / 2, y - segWidth / 2);
            ctx.stroke();
        }

        if (segmentState[6]) {
            ctx.beginPath();
            ctx.moveTo(x - segLength / 2 + segWidth / 2, y);
            ctx.lineTo(x + segLength / 2 - segWidth / 2, y);
            ctx.stroke();
        }
    }

    function captchaClose(cType) {
        if (isMobile) document.body.classList.remove('captcha-open');
        firstSymbolStatus = 0;
        modeChange = 0;
        captchaStatus = 0;
        let captchaValid = 0;
        let timeReact = '';
        let cValue = document.getElementById('shlepacomeback').value;
        let captchaTime = parseFloat(((Date.now() - captchaTimer) / 1000).toFixed(3));
        let captchaData = cValue;

        if (cType == 1) {
            let expectedCaptcha = morgen + "";
            let userInput = captchaData;

            if (firstSymbolTrainingStatus) {
                captchaValid = (expectedCaptcha[0] == userInput[0]);

                xxAllCaptchaFirstSymbol++;
                localStorage.setItem("xxAllCaptchaFirstSymbol", xxAllCaptchaFirstSymbol);

                if (captchaValid) {
                    xxGoodCaptchaFirstSymbol++;
                    xxCounterInputsFirstSymbol++;
                    xxAllInputsFirstSymbol += captchaTime;

                    localStorage.setItem("xxGoodCaptchaFirstSymbol", xxGoodCaptchaFirstSymbol);
                    localStorage.setItem("xxCounterInputsFirstSymbol", xxCounterInputsFirstSymbol);
                    localStorage.setItem("xxAllInputsFirstSymbol", xxAllInputsFirstSymbol);
                }
            } else {
                captchaValid = (expectedCaptcha == userInput);

                xxAllCaptchaNormal++;
                localStorage.setItem("xxAllCaptchaNormal", xxAllCaptchaNormal);

                if (captchaValid) {
                    xxGoodCaptchaNormal++;
                    xxCounterInputsNormal++;
                    xxCounterFirstSymbNormal++;
                    xxAllInputsNormal += captchaTime;
                    xxAllFirstSymbNormal += firstSymbol;

                    localStorage.setItem("xxGoodCaptchaNormal", xxGoodCaptchaNormal);
                    localStorage.setItem("xxCounterInputsNormal", xxCounterInputsNormal);
                    localStorage.setItem("xxCounterFirstSymbNormal", xxCounterFirstSymbNormal);
                    localStorage.setItem("xxAllInputsNormal", xxAllInputsNormal);
                    localStorage.setItem("xxAllFirstSymbNormal", xxAllFirstSymbNormal);
                }
            }

            updateStatisticsDisplay();

            if (paydayMode !== 'normal' && paydayStatus && captchaValid) {
                if (captchaTime < botReactionTimes[paydayMode]) {
                    typeChat(`Ты обогнал великого Taro_Ledyanoy! Ваше время: ${captchaTime}s`);
                } else {
                    typeChat(`Taro_Ledyanoy чет на изи тебя выебал! Ваше время: ${captchaTime}s`);
                }
            }

            let isRecord = false;
            if (captchaValid) {
                if (firstSymbolTrainingStatus) {
                    if (captchaTime < captchaRecordFirstSymbol || captchaRecordFirstSymbol == -1) {
                        isRecord = true;
                        captchaRecordFirstSymbol = captchaTime;
                        localStorage.setItem("captchaRecordFirstSymbol", captchaRecordFirstSymbol);
                        newRecordX();
                        recordArr.push(captchaRecordFirstSymbol);
                    }
                } else {
                    if (captchaTime < captchaRecordNormal || captchaRecordNormal == -1) {
                        isRecord = true;
                        captchaRecordNormal = captchaTime;
                        localStorage.setItem("captchaRecordNormal", captchaRecordNormal);
                        newRecordX();
                        recordArr.push(captchaRecordNormal);
                    }
                }
            };

            if (firstSymbolTrainingStatus) {
                let morgenString = morgen + "";
                typeChat((isRecord ? "[РЕКОРД] " : "") + "Первый символ введен " + (captchaValid ? "" : "не") + "верно (" + morgenString[0] + '|' + (captchaData[0] || 'нет') + ') за ' + captchaTime + "s (первая цифра: " + (firstSymbol != 0 ? firstSymbol + "s" : "нет") + (mode == 1 ? timeReact : "") + ")");
            } else {
                typeChat((isRecord ? "[РЕКОРД] " : "") + "Капча введена " + (captchaValid ? "" : "не") + "верно (" + expectedCaptcha + '|' + captchaData + ') за ' + captchaTime + "s (первая цифра: " + (firstSymbol != 0 ? firstSymbol + "s" : "нет") + (mode == 1 ? timeReact : "") + ")");
            }
        }

        document.getElementsByClassName('captchaDiv')[0].style.display = 'none';
        document.getElementsByClassName('typeDiv')[0].style.display = 'none';
        document.getElementById('shlepacomeback').value = null;
        document.getElementById('shlepacomeback').disabled = true;
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
        xxAllCaptchaNormal = parseInt(localStorage.getItem("xxAllCaptchaNormal") || "0");
        xxGoodCaptchaNormal = parseInt(localStorage.getItem("xxGoodCaptchaNormal") || "0");
        xxCounterInputsNormal = parseInt(localStorage.getItem("xxCounterInputsNormal") || "0");
        xxCounterFirstSymbNormal = parseInt(localStorage.getItem("xxCounterFirstSymbNormal") || "0");
        xxAllInputsNormal = parseFloat(localStorage.getItem("xxAllInputsNormal") || "0");
        xxAllFirstSymbNormal = parseFloat(localStorage.getItem("xxAllFirstSymbNormal") || "0");

        xxAllCaptchaFirstSymbol = parseInt(localStorage.getItem("xxAllCaptchaFirstSymbol") || "0");
        xxGoodCaptchaFirstSymbol = parseInt(localStorage.getItem("xxGoodCaptchaFirstSymbol") || "0");
        xxCounterInputsFirstSymbol = parseInt(localStorage.getItem("xxCounterInputsFirstSymbol") || "0");
        xxAllInputsFirstSymbol = parseFloat(localStorage.getItem("xxAllInputsFirstSymbol") || "0");

        captchaRecordNormal = parseFloat(localStorage.getItem("captchaRecordNormal") || "-1");
        captchaRecordFirstSymbol = parseFloat(localStorage.getItem("captchaRecordFirstSymbol") || "-1");

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
        document.getElementById('mobileStopBtn').onclick = function() {
            stopP();
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
        updateStatisticsDisplay();
        document.getElementById('shlepacomeback').oninput = firstTime;
        if (autoZeroStatus) {
            document.getElementById('autoZero').classList.add('btnSelected');
        }
        if (captchaLagStatus) {
            document.getElementById('captchaLag').classList.add('btnSelected');
        }
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
        if (isMobile) {
            document.getElementById('mobileCaptchaBtn').style.display = 'block';
            document.getElementById('mobileCaptchaBtn').onclick = function() {
                if (mode == 0) {
                    captchaLagged();
                } else if (mode == 1) {
                    if (!paydayStatus && !paydayHelp) {
                        if (!paydayAutoStatus) {
                            paydayGo();
                        }
                    } else if (paydayStatus) {
                        captchaLagged();
                    }
                } else if (mode == 2) {
                    if (!modeFcaptchaRequired) {
                        captchaOpen();
                        modeFcaptchaRequired = 1;
                    }
                }
            };
        }
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
        document.getElementById('autoZero').onclick = autoZero;
        document.getElementById('firstSymbolTrain').onclick = firstSymbolTraining;
    };
})();
