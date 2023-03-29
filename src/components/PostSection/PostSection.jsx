import React, { useState } from "react";
import css from './PostSection.module.css';
import { UilPlusCircle } from '@iconscout/react-unicons';
import { ThreadModal } from "../ThreadModal/ThreadModal";

export const PostSection = () => {

    const [modal, setModal] = useState(false);

    return (
        <div className={css.container}>
            <ThreadModal modal={modal} setModal={setModal} title={"Dodaj odpowiedz:"}/>

            <div className={css.btnWrapper}>
                <div className={`btn ${css.btn}`} onClick={() => setModal((prev) => !prev)}>
                    <div className={css.circle}><UilPlusCircle/></div>
                    Dodaj odpowiedz
                </div>
            </div>
            <div className={css.post}>
                <div className={css.profileInfo}>
                    <span>Mikolaj</span>
                    <div className={css.sampleImg}>
                        <span></span>
                    </div>
                    <span>Uzytkownik</span>
                    <span>4 odpowiedzi</span>
                    <span>Dolaczyl 22.03.2023r.</span>
                </div>
                <div className={css.content}>
                    <span>24.03.2023 17:30</span>
                    <span>
                        Jest błąd w pytaniu: 'Nowe pamięci Kingston potrafią synchronizować efekty RGB bez kabli. Jaka technologia za to odpowiada?'<br/><br/>
                        Kingston Wireless Sync<br/>
                        FURYSync RGB<br/>
                        FURY Infrated Sync  <br/><br/>
                        Nie ma prawidłowej odpowiedzi, bo prawidłową jest 'Infrared Sync Technology'<br/><br/>
                        -----<br/><br/>
                        Dodatkowo mam pytanie, co oznacza zapis w regulaminie:<br/><br/>
                        'W przypadku odpowiedzi przez jednego Uczestnika z więcej niż jednego konta, uwzględnione zostaną wyłącznie odpowiedzi, które zostały zarejestrowane w systemie jako te z pierwszego podanego konta.'<br/><br/>
                        Mam tu jakieś dziwne przypuszczenie, że robicie tu ostrego wała - np. przeciw ludziom ze zmiennym IP.
                    </span>
                </div>
            </div>

            
        </div>
    )
}