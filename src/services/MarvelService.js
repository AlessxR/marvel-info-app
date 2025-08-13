class MarvelService {

    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=58d274c3c444b01407bfe5941d013b72";

    getResources = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            name: character.name,
            descr: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.path.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }

}

export default MarvelService;

