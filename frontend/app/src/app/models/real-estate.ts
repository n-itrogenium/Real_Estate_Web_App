export class RealEstate {
    _id: string;
    name: string; // deskriptivan opis
    address: string; // adresa
    city: string; // grad
    municipality: string; // opština
    type: number; // kuća (0) ili stan (1)
    height: number; // broj spratova
    floor: number; // sprat na kom je stan
    squaremeters: number; // kvadratura
    rooms: number; // broj soba
    furnished: boolean; // namešten ili ne
    gallery: string[]; // galerija slika i videa
    sale: number; // izdavanje (0) ili prodaja (1)
    price: number; // cena mesečnog izdavanja ili nekretnine
    owner: string; // vlasnik (korisnik ili agencija)
    promo: boolean; // prikaz među promovisanim nekretninama
    approved: boolean; // odobrena od strane agenta
    sold: boolean; // da li je prodata, ako je na prodaju
}