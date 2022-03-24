import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://lcdddevtestapp-env.eba-d22aejrz.eu-west-3.elasticbeanstalk.com' }),
    tagTypes: [],
    endpoints: (build) => ({
        updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
            query: (queryArg) => ({ url: `/api/v1/user/update`, method: 'POST', body: queryArg.utilisateurRequestDto }),
        }),
        createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
            query: (queryArg) => ({ url: `/api/v1/user/create`, method: 'POST', body: queryArg.utilisateurRequestDto }),
        }),
        uploadPic: build.mutation<UploadPicApiResponse, UploadPicApiArg>({
            query: (queryArg) => ({ url: `/api/v1/topic/upload`, method: 'POST', body: queryArg.body }),
        }),
        sendEmail: build.mutation<SendEmailApiResponse, SendEmailApiArg>({
            query: (queryArg) => ({ url: `/api/v1/sendMail`, method: 'POST', body: queryArg.contactRequestDto }),
        }),
        sendEmailIntervenant: build.mutation<SendEmailIntervenantApiResponse, SendEmailIntervenantApiArg>({
            query: (queryArg) => ({
                url: `/api/v1/sendMailIntervenant`,
                method: 'POST',
                body: queryArg.emailIntervenantDto,
            }),
        }),
        add: build.mutation<AddApiResponse, AddApiArg>({
            query: (queryArg) => ({ url: `/api/v1/preference/add`, method: 'POST', body: queryArg.userPreferenceDto }),
        }),
        searchForArticles: build.mutation<SearchForArticlesApiResponse, SearchForArticlesApiArg>({
            query: (queryArg) => ({
                url: `/api/v1/legifrance/search`,
                method: 'POST',
                body: queryArg.legiFranceSearchFormDto,
            }),
        }),
        updateintervenant: build.mutation<UpdateintervenantApiResponse, UpdateintervenantApiArg>({
            query: (queryArg) => ({
                url: `/api/v1/intervenant/update`,
                method: 'POST',
                body: queryArg.intervenantResponseDto,
            }),
        }),
        createIntervenant: build.mutation<CreateIntervenantApiResponse, CreateIntervenantApiArg>({
            query: (queryArg) => ({
                url: `/api/v1/intervenant/create`,
                method: 'POST',
                body: queryArg.intervenantRequestDto,
            }),
        }),
        getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
            query: (queryArg) => ({ url: `/api/v1/user/${queryArg.id}` }),
        }),
        getAllUsers: build.query<GetAllUsersApiResponse, GetAllUsersApiArg>({
            query: () => ({ url: `/api/v1/user/all` }),
        }),
        getTopicById: build.query<GetTopicByIdApiResponse, GetTopicByIdApiArg>({
            query: (queryArg) => ({ url: `/api/v1/topic/${queryArg.id}` }),
        }),
        getAllTopics: build.query<GetAllTopicsApiResponse, GetAllTopicsApiArg>({
            query: () => ({ url: `/api/v1/topic/all` }),
        }),
        getAll: build.query<GetAllApiResponse, GetAllApiArg>({
            query: () => ({ url: `/api/v1/preference/get` }),
        }),
        getApiV1PreferenceGetByKey: build.query<
            GetApiV1PreferenceGetByKeyApiResponse,
            GetApiV1PreferenceGetByKeyApiArg
        >({
            query: (queryArg) => ({ url: `/api/v1/preference/get/${queryArg.key}` }),
        }),
        getAllowed: build.query<GetAllowedApiResponse, GetAllowedApiArg>({
            query: () => ({ url: `/api/v1/preference/allowed` }),
        }),
        suggestArticles: build.query<SuggestArticlesApiResponse, SuggestArticlesApiArg>({
            query: (queryArg) => ({
                url: `/api/v1/legifrance/suggest/${queryArg.supply}`,
                params: { textSearch: queryArg.textSearch },
            }),
        }),
        suggestArticlesFromElastic: build.query<
            SuggestArticlesFromElasticApiResponse,
            SuggestArticlesFromElasticApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/legifrance/suggest-elastic/${queryArg.supply}`,
                params: { textSearch: queryArg.textSearch },
            }),
        }),
        getIntervenant: build.query<GetIntervenantApiResponse, GetIntervenantApiArg>({
            query: (queryArg) => ({ url: `/api/v1/intervenant/${queryArg.professionalEmail}` }),
        }),
        getAllIntervenants: build.query<GetAllIntervenantsApiResponse, GetAllIntervenantsApiArg>({
            query: () => ({ url: `/api/v1/intervenant/all` }),
        }),
        getAllStatus: build.query<GetAllStatusApiResponse, GetAllStatusApiArg>({
            query: () => ({ url: `/api/v1/enum/status/all` }),
        }),
        getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
            query: () => ({ url: `/api/v1/enum/role/all` }),
        }),
        getAllProfessions: build.query<GetAllProfessionsApiResponse, GetAllProfessionsApiArg>({
            query: () => ({ url: `/api/v1/enum/profession/all` }),
        }),
        stopChannel: build.query<StopChannelApiResponse, StopChannelApiArg>({
            query: () => ({ url: `/api/v1/channel/stop` }),
        }),
        handleRunningProgress: build.query<HandleRunningProgressApiResponse, HandleRunningProgressApiArg>({
            query: () => ({ url: `/api/v1/channel/state` }),
        }),
        startChannel: build.query<StartChannelApiResponse, StartChannelApiArg>({
            query: () => ({ url: `/api/v1/channel/start` }),
        }),
        deleteChannel: build.query<DeleteChannelApiResponse, DeleteChannelApiArg>({
            query: () => ({ url: `/api/v1/channel/delete` }),
        }),
        handleCreationProgress: build.query<HandleCreationProgressApiResponse, HandleCreationProgressApiArg>({
            query: () => ({ url: `/api/v1/channel/creation-progress` }),
        }),
        createChannel: build.query<CreateChannelApiResponse, CreateChannelApiArg>({
            query: () => ({ url: `/api/v1/channel/create` }),
        }),
        deleteApiV1PreferenceDeleteByKey: build.mutation<
            DeleteApiV1PreferenceDeleteByKeyApiResponse,
            DeleteApiV1PreferenceDeleteByKeyApiArg
        >({
            query: (queryArg) => ({ url: `/api/v1/preference/delete/${queryArg.key}`, method: 'DELETE' }),
        }),
        deleteAll: build.mutation<DeleteAllApiResponse, DeleteAllApiArg>({
            query: () => ({ url: `/api/v1/preference/delete-all`, method: 'DELETE' }),
        }),
    }),
});
export type UpdateUserApiResponse =
    /** status 201 Mettre à jour d'une utilisateur avec succès */ UtilisateurRequestDto[];
export type UpdateUserApiArg = {
    utilisateurRequestDto: UtilisateurRequestDto;
};
export type CreateUserApiResponse = /** status 201 Ajout d'une utilisateur avec succès */ UtilisateurRequestDto[];
export type CreateUserApiArg = {
    utilisateurRequestDto: UtilisateurRequestDto;
};
export type UploadPicApiResponse = /** status 201 Ajout d'une pictogramme thematiques avec succès */ TopicDto[];
export type UploadPicApiArg = {
    body: {
        file?: Blob;
    };
};
export type SendEmailApiResponse = unknown;
export type SendEmailApiArg = {
    contactRequestDto: ContactRequestDTO;
};
export type SendEmailIntervenantApiResponse = unknown;
export type SendEmailIntervenantApiArg = {
    emailIntervenantDto: EmailIntervenantDTO;
};
export type AddApiResponse = /** status 201 Ajout d'une préférence utilisateur avec succès */ undefined;
export type AddApiArg = {
    userPreferenceDto: UserPreferenceDto;
};
export type SearchForArticlesApiResponse = /** status 200 Success */ SearchResponse;
export type SearchForArticlesApiArg = {
    legiFranceSearchFormDto: LegiFranceSearchFormDto;
};
export type UpdateintervenantApiResponse =
    /** status 201 Mettre à jour d'une intervenant avec succès */ IntervenantResponseDTO[];
export type UpdateintervenantApiArg = {
    intervenantResponseDto: IntervenantResponseDTO;
};
export type CreateIntervenantApiResponse =
    /** status 201 Ajout d'une intervenant avec succès */ IntervenantRequestDTO[];
export type CreateIntervenantApiArg = {
    intervenantRequestDto: IntervenantRequestDTO;
};
export type GetUserByIdApiResponse = /** status 200 L'utilisateur renvoyée avec succès */ UtilisateurResponseDto[];
export type GetUserByIdApiArg = {
    id: number;
};
export type GetAllUsersApiResponse =
    /** status 200 Liste des utilisateurs renvoyée avec succès */ UtilisateurResponseDto[];
export type GetAllUsersApiArg = {};
export type GetTopicByIdApiResponse = /** status 200 La thematiques renvoyée avec succès */ TopicDto[];
export type GetTopicByIdApiArg = {
    id: number;
};
export type GetAllTopicsApiResponse = /** status 200 Liste des thematiques renvoyée avec succès */ TopicDto[];
export type GetAllTopicsApiArg = {};
export type GetAllApiResponse =
    /** status 200 Liste des préférences de l'utilisateur renvoyée avec succès */ UserPreferenceDto[];
export type GetAllApiArg = {};
export type GetApiV1PreferenceGetByKeyApiResponse =
    /** status 200 Préférence de l'utilisateur renvoyée avec succès */ UserPreferenceDto[];
export type GetApiV1PreferenceGetByKeyApiArg = {
    key: string;
};
export type GetAllowedApiResponse = /** status 200 Liste des préférences renvoyée avec succès */ PreferenceDto[];
export type GetAllowedApiArg = {};
export type SuggestArticlesApiResponse = /** status 200 Success */ SuggestResponse;
export type SuggestArticlesApiArg = {
    supply: string;
    textSearch: string;
};
export type SuggestArticlesFromElasticApiResponse = /** status 200 Success */ SuggestResponse;
export type SuggestArticlesFromElasticApiArg = {
    supply: string;
    textSearch: string;
};
export type GetIntervenantApiResponse = /** status 200 L'intervenant renvoyée avec succès */ UtilisateurResponseDto[];
export type GetIntervenantApiArg = {
    professionalEmail: string;
};
export type GetAllIntervenantsApiResponse =
    /** status 200 Liste des intervenants renvoyée avec succès */ UtilisateurResponseDto[];
export type GetAllIntervenantsApiArg = {};
export type GetAllStatusApiResponse = /** status 200 Liste des statuses renvoyée avec succès */ EnumDto[];
export type GetAllStatusApiArg = {};
export type GetAllRolesApiResponse = /** status 200 Liste des roles renvoyée avec succès */ EnumDto[];
export type GetAllRolesApiArg = {};
export type GetAllProfessionsApiResponse = /** status 200 Liste des professions renvoyée avec succès */ EnumDto[];
export type GetAllProfessionsApiArg = {};
export type StopChannelApiResponse = /** status 200 The Channel stopping is progressing */ InfoFront[];
export type StopChannelApiArg = {};
export type HandleRunningProgressApiResponse = /** status 200 the current Channel state */ InfoFront[];
export type HandleRunningProgressApiArg = {};
export type StartChannelApiResponse = /** status 200 The Channel start is progressing */ InfoFront[];
export type StartChannelApiArg = {};
export type DeleteChannelApiResponse = /** status 200 The Channel delete is progressing */ InfoFront[];
export type DeleteChannelApiArg = {};
export type HandleCreationProgressApiResponse =
    /** status 200 The Channel is created and the RTMP adresses and URLs for the live are returned */ AdressesRtmpHttp[];
export type HandleCreationProgressApiArg = {};
export type CreateChannelApiResponse = /** status 200 The channel creation is launched */ InfoFront[];
export type CreateChannelApiArg = {};
export type DeleteApiV1PreferenceDeleteByKeyApiResponse = /** status 204 Suppression faite avec succès */ undefined;
export type DeleteApiV1PreferenceDeleteByKeyApiArg = {
    key: string;
};
export type DeleteAllApiResponse = /** status 204 Suppression faite avec succès */ undefined;
export type DeleteAllApiArg = {};
export type UtilisateurRequestDto = {
    firstname?: string;
    lastname?: string;
    email: string;
    town?: string;
    roleId?: number;
    statusId?: number;
    is_email_verified?: boolean;
};
export type ErrorDto = {
    timestamp?: string;
    status?: string;
    message?: string;
};
export type TopicDto = {
    id?: number;
    topic?: string;
    file?: Blob;
};
export type ContactRequestDTO = {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
};
export type EmailIntervenantDTO = {
    email: string;
    phone_number: string;
};
export type UserPreferenceDto = {
    pref?: string;
};
export type TitleDto = {
    id?: string;
    cid?: string;
    title?: string;
    legalStatus?: string;
    startDate?: string;
    endDate?: string;
    nature?: string;
};
export type SearchResultDto = {
    titles?: TitleDto[];
    text?: string;
    type?: string;
    origin?: string;
    etat?: string;
    date?: number;
    sections?: string[];
    nor?: string;
};
export type SearchResponse = {
    totalResultNumber?: number;
    results?: SearchResultDto[];
};
export type LegiFranceSearchFormDto = {
    searchValue?: string;
    pageNumber?: number;
    pageSize?: number;
};
export type IntervenantResponseDTO = {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    professionalEmail?: string;
    email_verified?: boolean;
    town?: string;
    bio?: string;
    professionId?: number;
    roleId?: number;
    statusId?: number;
    picByte?: string[];
};
export type IntervenantRequestDTO = {
    phone: string;
    professionalEmail: string;
    bio: string;
    professionId?: number;
    email: string;
    pic_byte?: string[];
};
export type UtilisateurResponseDto = {
    id?: number;
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    professionalEmail?: string;
    email_verified?: boolean;
    town?: string;
    bio?: string;
    professionId?: number;
    roleId?: number;
    statusId?: number;
    picByte?: string[];
};
export type PreferenceDto = {
    key?: string;
    description?: string;
};
export type ChapterSearchResult = {
    title?: string;
    id?: string;
    hlTitre?: string[];
    hlSousTitres?: string[];
    hlMotsCles?: string[];
    hlResume?: string[];
    hlThematique?: string[];
    hlDescription?: string[];
    hlCodesArticles?: string[];
    hlCodesJurisprudence?: string[];
};
export type DocumentDto = {
    id?: string;
    label?: string;
    origin?: string;
    nature?: string;
    dateVersion?: number;
    section?: string;
    idTexte?: string;
};
export type ResultsDto = {
    title?: {
        [key: string]: DocumentDto;
    };
    articles?: {
        [key: string]: DocumentDto;
    };
    section?: {
        [key: string]: DocumentDto;
    };
};
export type SuggestResponse = {
    chapterResults?: ChapterSearchResult[];
    results?: ResultsDto;
};
export type EnumDto = {
    name?: string;
    id?: number;
};
export type InfoFront = {
    message?: string;
};
export type AdressesRtmpHttp = {
    rtmp1?: string;
    rtmp2?: string;
    dashEndPoint?: string;
    hlsEndpoint?: string;
};
export const {
    useUpdateUserMutation,
    useCreateUserMutation,
    useUploadPicMutation,
    useSendEmailMutation,
    useSendEmailIntervenantMutation,
    useAddMutation,
    useSearchForArticlesMutation,
    useUpdateintervenantMutation,
    useCreateIntervenantMutation,
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useGetTopicByIdQuery,
    useGetAllTopicsQuery,
    useGetAllQuery,
    useGetApiV1PreferenceGetByKeyQuery,
    useGetAllowedQuery,
    useSuggestArticlesQuery,
    useSuggestArticlesFromElasticQuery,
    useGetIntervenantQuery,
    useGetAllIntervenantsQuery,
    useGetAllStatusQuery,
    useGetAllRolesQuery,
    useGetAllProfessionsQuery,
    useStopChannelQuery,
    useHandleRunningProgressQuery,
    useStartChannelQuery,
    useDeleteChannelQuery,
    useHandleCreationProgressQuery,
    useCreateChannelQuery,
    useDeleteApiV1PreferenceDeleteByKeyMutation,
    useDeleteAllMutation,
} = api;
