import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const initGA = (history) => {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', process.env.REACT_APP_GOOGLE_IDENTIFIER, 'auto');
    ga('send', 'pageview');

    history.listen((location) => {
        console.log("tracking page view: " + location.pathname);
        ga('send', 'pageview', location.pathname);
    });
};

if(process.env.REACT_APP_GOOGLE_IDENTIFIER){
    initGA(history);
}

export default history;