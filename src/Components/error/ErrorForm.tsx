import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo_error } from '~/assets/logos/Logo_error.svg';
import './ErrorForm.css';

const ErrorForm: FC = () => {
    const history = useHistory();

    const redirectionVideo = () => {
        history.push('/questions/'); // Redirect to contact
    };

    const redirectionTV = () => {
        history.push('/webTV'); // Redirect to contact
    };

    const redirectionNousContacter = () => {
        history.push('/contact-us'); // Redirect to contact
    };

    return (
        <div>
            <div className="text_display2">Oups!</div>
            <div className="text_h1_heading">Something went wrong. We are working on it.</div>
            <div className="text_h3_heading">Where to go from here:</div>

            <div onClick={redirectionVideo} className="link_video">
                Trouvez des réponses en videos à vos questions
            </div>
            <div onClick={redirectionTV} className="link_tv">
                Regardez des ateliers sur notre WebTV
            </div>
            <div onClick={redirectionNousContacter} className="link_contact">
                Nous contacter
            </div>
            <Logo_error className="image" title="Logo_error" />
        </div>
    );
};

export default ErrorForm;
