export type Service = {
    _id: string;
    name: string;
    description?: string;
    img: string;
    slug: string;
}

export type Reference = {
    _id: string;
    img: string;
}

export type Contact = {
    _id: string,
    desc?: string,
    address?: string,
    phone?: string,
    email?: string,
    facebook?: string,
    instagram?: string,
    linkedin?: string,
}

export type Project = {
    _id: string,
    name: string,
    year: number,
    img: string,
    path: string,
    employer: string,
    location: string,
    type: string,
    time: string,
    slug: string,
}