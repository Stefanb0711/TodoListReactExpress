--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: listelements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listelements (
    id integer NOT NULL,
    content text,
    list_id integer
);


ALTER TABLE public.listelements OWNER TO postgres;

--
-- Name: listelements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listelements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listelements_id_seq OWNER TO postgres;

--
-- Name: listelements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listelements_id_seq OWNED BY public.listelements.id;


--
-- Name: todogroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todogroups (
    id integer NOT NULL,
    list_name text,
    user_id integer NOT NULL
);


ALTER TABLE public.todogroups OWNER TO postgres;

--
-- Name: todogroups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todogroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todogroups_id_seq OWNER TO postgres;

--
-- Name: todogroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todogroups_id_seq OWNED BY public.todogroups.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: listelements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listelements ALTER COLUMN id SET DEFAULT nextval('public.listelements_id_seq'::regclass);


--
-- Name: todogroups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todogroups ALTER COLUMN id SET DEFAULT nextval('public.todogroups_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: listelements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.listelements (id, content, list_id) FROM stdin;
18	Ein Eintrag	56
21	sxsxsaxax	58
23	Drei Eintrag	56
27	bbgfc	57
28	saxs	57
29	ax	58
\.


--
-- Data for Name: todogroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todogroups (id, list_name, user_id) FROM stdin;
56	Erster	11
57	Zweiter	11
58	Dritter	11
60	Vierter	11
61	nkn	11
62	fedf	11
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
1	ddwd	xaxa@gamil.com	sadsa
2	ddwd	stefan@gmail	$2b$10$BBrMds89au3w2yv4Cfjq9uomuDv2Fwsxc0K1IP7AGt1ScDGAmxe3W
3	sdsdw	sbhjbds@ganm	$2b$10$iLg1Zlht/aE6JGeBZXDPEuhETgOAHpSnByaSnN0jq2r1jLF/w6bLW
4	sdsdw	sbhjbds@ganm	$2b$10$vhk4jPEVMG3/VAQjFHPm.u5gpKo9goC5m43xF.lePMLVhMVJRv6Im
5	sdsdw	sbhjbds@ganm	$2b$10$Mf/ZGbBc5oodVdLSRxoStOnO.dAZxO.qGXvw4AETrlhYo5zsVn/4q
6	sdsdw	sbhjbds@ganm	$2b$10$5gO0uQ064YU9PgqlNk4XEux/8CEcHCthHs6w0BTdbo77ewAK2iZ0y
7	ddwdsads	sbhjbds@ganm	$2b$10$myaRQ6YeIQmJ55sI8XkyuOIXo9BWvMTyty5pRgJwo218lJBtV/V4m
8	ddwd	xaxa@gamil.com	$2b$10$cD0d7J2H2i0iG2KXGOuU.OM4T/6DYJvvaDgM6lLZGPu.C9BrpuWfS
9	ddwddsadw	sbhjbds@ganm	$2b$10$iOlyjNBZZIRGatCxg7cOsOfZJdghmP29dfiEYoms0xVs946ZLKErW
10	ddwd	sbhjbds@ganm	$2b$10$7mj9cb8K8ZIusWozqnDrfux25bNmFUn9nvH61.ibEYdRJEuSrr01i
11	Stefan	stefanboehme123456@gmail.com	$2b$10$6FT5NqKtR7gM9rptfYXwRuTOPrHSMYuuCp3ASMjKuVRbmv3gpxnKW
12	Stef	stefan@werner	$2b$10$CcM8KHr7O47kcGWFoxnpBuG.JAi2Y.TBA1Tcb7uul8nednHouvMFG
\.


--
-- Name: listelements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listelements_id_seq', 31, true);


--
-- Name: todogroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todogroups_id_seq', 62, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: listelements listelements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listelements
    ADD CONSTRAINT listelements_pkey PRIMARY KEY (id);


--
-- Name: todogroups todogroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todogroups
    ADD CONSTRAINT todogroups_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: listelements listelements_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listelements
    ADD CONSTRAINT listelements_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.todogroups(id) ON DELETE CASCADE;


--
-- Name: todogroups todogroups_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todogroups
    ADD CONSTRAINT todogroups_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

