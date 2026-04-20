import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

type StrapiResponse<T> = {
    data: T;
};

export const getCreed = async (locale: string) => {
    const res: StrapiResponse<any> = await api.get("/creed", {
        params: { locale },
    });

    return res.data.data;
};

export const getMajor = async (locale: string) => {
    const res: StrapiResponse<any> = await api.get("/major", {
        params: { locale },
    });

    return res.data.data;
};

export const getAbout = async (locale: string) => {
    const res = await api.get("/about", {
        params: { locale,
            populate: {
                InfoBadge: true, // 👈 ВАЖНО
            },
         },
        
    });

    return res.data.data;
};

export const getSkills = async () => {
    const res: StrapiResponse<any> = await api.get("/skills", {
        params: {
            populate: {
                image: true,
            },
        },
    });
    return res.data.data;
};

export const getProjects = async (locale: string) => {
    const { data } = await api.get("/projects", {
        params: {
            locale,
            populate: ["skills", "links", "tasks", "experience", "image"],
        },
    });


    return data.data;
};

export const getContacts = async (locale: string) => {
    const res: StrapiResponse<any> = await api.get("/contacts", {
        params: {
            locale,
        }
    })


    return res.data.data
}

export const getExperience = async (locale: string) => {
    const res: StrapiResponse<any> = await api.get("/experiences", {
        params: {
            locale,
            populate: {
                projects: {
                    populate: ['tasks'] // Явно просим загрузить tasks внутри каждого проекта
                }
            }
        }
    })

    return res.data.data;
}

export const sendMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await axios.post(`${API_URL}/api/send`, data);
  return res.data;
};