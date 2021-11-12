export class Constants {

    //FILMS 
    public static FILMS_TITLE = 'films.title';

    //ROUTES
    public static ROUTE_IMAGE_NOT_FOUND = './assets/images/imageNotFound.jpg';
    public static ROUTE_API_FILMS = 'films';
    public static ROUTE_API_COMPANIES = 'companies';
    public static ROUTE_API_ACTORS = 'actors';
    public static ROUTE_FILMS = '/films';
    public static ROUTE_FILMS_EDIT = '/films/edit'
    public static ROUTE_FILMS_CREATE = '/films/create'
    public static ROUTE_ACTORS = '/actors';
    public static ROUTE_COMPANIES = '/companies';
    public static ROUTE_EDIT = 'edit';
    public static ROUTE_CREATE = 'create';

    //SIDEBAR
    public static SIDEBAR_FILMS = 'films.sidebar';
    public static SIDEBAR_ACTORS = 'actors.sidebar';
    public static SIDEBAR_COMPANIES = 'companies.sidebar';

    //REDUX ACTIONS
    public static ACTION_FILMS_FETCH = '[Films] Fetch Films';
    public static ACTION_FILMS_SET = '[Films] Set Films';
    public static ACTION_FILMS_UPDATE = '[Films] Update Film';
    public static ACTION_FILMS_DELETE = '[Films] Delete Film';
    public static ACTION_FILMS_CREATE = '[Films] Create Film';
    public static ACTION_COMPANIES_FETCH = '[Companies] Fetch Companies';
    public static ACTION_COMPANIES_SET = '[Companies] Set Companies';
    public static ACTION_COMPANIES_UPDATE_FILMS = '[Companies] Update Companies Films';
    public static ACTION_ACTORS_FETCH = '[Actors] Fetch Actors';
    public static ACTION_ACTORS_SET = '[Actors] Set Actors';
    public static ACTION_ACTORS_UPDATE_FILMS = '[Actors] Update Actors Films';

}