import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Params = {
    [key: string]: string | undefined;
};

const useUrlParams = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState<Params>({});

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const newParams: Params = {};
        for (const [key, value] of searchParams.entries()) {
            newParams[key] = value;
        }
        setParams(newParams);
    }, [location.search]);

    const addParam = (key: string, value: string) => {
        const newParams = { ...params, [key]: value };
        const searchParams = new URLSearchParams(newParams);
        navigate({ search: `?${searchParams.toString()}` });
    };

    const removeParam = (key: string) => {
        const newParams:any = { ...params };
        delete newParams[key];
        const searchParams = new URLSearchParams(newParams);
        navigate({ search: `?${searchParams.toString()}` });
    };

    const getParam = (key: string): string | undefined => {
        return params[key];
    };

    return { params, addParam, removeParam, getParam };
};

export default useUrlParams;
