export type SingleContent = {
        id: number;
        documentId: string;
        content: string;
        locale: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
};

export type InfoBadge = {
    id: number;
    title: string;
};

export type StrapiBlock = {
    type: string;
    children: {
        text: string;
        bold?: boolean;
        type: string;
    }[];
};

export type AboutContent = {
    id: number;
    documentId: string;
    locale: string;
    About: StrapiBlock[];
    InfoBadge: InfoBadge[];
};

export type Skill = {
    id: number;
    title: string;
    order: number;
    image?: {
        url: string;
        name: string;
    };
};

export type ProjectLink = {
    id: number;
    link: string;
};

export type ProjectSkill = {
    id: number;
    title: string;
}

export type Project = {
    id: number;
    documentId: string;

    title: string;
    description: string;

    image: {
        url: string,
        name: string
    }; // 👈 теперь просто строка

    startDate: string;
    endDate: string;

    locale: string;

    createdAt: string;
    updatedAt: string;
    publishedAt: string;

    skills: ProjectSkill[];
    links: ProjectLink[];
};

export interface ContactSocial {
  id: number;
  documentId: string;
  title: string;
  description: string;
  link: string | null;
  icon: string;
  badge: string | null;
  badgeType: string | null;
  locale: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}