declare module BasicListApi {

    type ActionHandler=(action: BasicListApi.Action) => void;

    type Page ={
        title: string;
        type: string;
        searchBar?: boolean;
        trash?: boolean;
    }

    type Action = {
        component: string;
        text: string;
        type: string;
        action: string;
        uri?: string;
        method?: string;
    }

    type Field ={
        title: string;
        dataIndex: string;
        key: string;
        [key: string]: any;    //接受各种字段的定义
    }

    type DataSource ={
        [key: string]: any;    //接受各种字段的定义
    }

    type Meta ={
        total: number;
        per_page: number;
        page: number;
    }
    type Tabs ={
        name: string;
        title: string;
        data: Field[];
    }
    type Actions ={
        name: string;
        title: string;
        data: Action[];
    }

    type ListLayout ={
        tableColumn: TableColumn[];
        tableToolBar: Action[];
        batchToolBar: Action[];
    }

    type PageLayout ={
        tabs:Tabs[];
        actions:Actions[];
    }

    type ListData={
        page: Page;
        layout: ListLayout;
        dataSource: DataSource[];
        meta: Meta;
    }
   type PageData ={
        page: Page;
        layout: PageLayout;
        dataSource: DataSource;
    }

    type Root ={
        success: boolean;
        message: string;
        data: ListData|PageData;
    }

}

