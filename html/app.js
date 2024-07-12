import importTemplate from './utils/importTemplate.js';
import inlinesvg from './utils/inlineSvg.js';
import { FormatMoney, CalculateVehicleStatistic, ShowNotify } from './utils/functions.js';

const preview = {
    template: await importTemplate('./pages/preview.html')
}
const dashboard = {
    template: await importTemplate('./pages/bossmenu/dashboard.html')
}

const store = Vuex.createStore({
    state: {},
    mutations: {},
    actions: {}
});

const app = Vue.createApp({
    components: {
        preview,
        inlinesvg,
        dashboard
    },
    
    data: () => ({
        Show: true,
        MainPage: 'Bossmenu', // 'Normal', 'Component', "Bossmenu"
        activePage: 'dashboard', // 'preview', 'dashboard'
        HasOwner: false,

        // Player Information
        PlayerName: "Oph3Z Second",
        PlayerRank: 'Owner',
        PlayerMoney: 1000000,
        PlayerPfp: "https://cdn.discordapp.com/attachments/926499504922959922/1258479292023832709/image.png?ex=668a2bec&is=6688da6c&hm=b5c4fcc212b673d6d36c870239620b9f0574ce58944b991ff1a3e533437849f9&",

        // Vehicleshop Variables
        VehicleShopName: "Oph3Z's Dealership",
        VehicleshopDescription: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum aperiam neque nisi nemo itaque error voluptatem, ut minus, eaque ex similique maxime!",
        VehicleShopStar: 4,
        TestDrivePrice: 7500,
        ShowColorPicker: false,
        ColorPickerColor: "#FFF",
        SelectedColor: null,
        ColorsTable: [
            { color: "#FF5733" },
            { color: "#33FF57" },
            { color: "#3357FF" },
            { color: "#FF33A1" },
            { color: "#A133FF" },
            { color: "#33FFA1" },
            { color: "#FF5733" },
            { color: "#FFBD33" },
            { color: "#33FFBD" },
            { color: "#BD33FF" },
            { color: "#5733FF" },
            { color: "#FFA133" },
            { color: "#A1FF33" },
            { color: "#33A1FF" },
            { color: "#FF33BD" },
            { color: "#33BDFF" },
            { color: "#BDFF33" },
            { color: "#33FF57" },
            { color: "#57FF33" },
            { color: "#FF33FF" },
            { color: "#33FF33" },
            { color: "#FF3333" }
        ],
        AllowPlateChange: true,
        ShowPlateChange: false,
        PlateInput: "",
        CategoryList: [
            {
                name: 'all',
                label: 'All'
            },
            {
                name: 'sports',
                label: 'Sports'
            },
            {
                name: 'sedans',
                label: 'Sedans'
            },
            {
                name: 'suv',
                label: 'SUVs'
            },
            {
                name: 'trucks',
                label: 'Trucks'
            },
        ],
        SelectedVehicleCategory: 'all',
        VehiclesTable: [
            {
                name: 't20',
                label: 'T20',
                model: 'Super',
                category: 'sports',
                price: 13000000,
                stock: 20,
                img: 'https://docs.fivem.net/vehicles/t20.webp',
                information: {
                    TopSpeed: 273,
                    Braking: 100,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 89
                }
            },
            {
                name: 'elegy',
                label: 'Elegy',
                model: 'Custom',
                category: 'sports',
                price: 2500000,
                stock: 0,
                img: 'https://docs.fivem.net/vehicles/elegy.webp',
                information: {
                    TopSpeed: 273,
                    Braking: 100,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 89
                }
            },
            {
                name: 'sultanrs',
                label: 'Sultan RS',
                model: 'Normal',
                category: 'sedans',
                price: 1000000,
                stock: 2,
                img: 'https://docs.fivem.net/vehicles/sultanrs.webp',
                information: {
                    TopSpeed: 123,
                    Braking: 75,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 45
                }
            },
            {
                name: 'sultanrs',
                label: 'Sultan RS',
                model: 'Normal',
                category: 'sedans',
                price: 1000000,
                stock: 2,
                img: 'https://docs.fivem.net/vehicles/sultanrs.webp',
                information: {
                    TopSpeed: 273,
                    Braking: 100,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 89
                }
            },
            {
                name: 'sultanrs',
                label: 'Sultan RS',
                model: 'Normal',
                category: 'sedans',
                price: 1000000,
                stock: 2,
                img: 'https://docs.fivem.net/vehicles/sultanrs.webp',
                information: {
                    TopSpeed: 273,
                    Braking: 100,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 89
                }
            },
            {
                name: 'sultanrs',
                label: 'Sultan RS',
                model: 'Normal',
                category: 'sedans',
                price: 1000000,
                stock: 2,
                img: 'https://docs.fivem.net/vehicles/sultanrs.webp',
                information: {
                    TopSpeed: 273,
                    Braking: 100,
                    Acceleration: 89,
                    Suspension: 100,
                    Handling: 89
                }
            },
        ],
        SelectedVehicleTable: {
            VehicleIndex: -1,
            VehicleLabel: "",
            VehicleModel: "",
            VehiclePrice: 0,
            VehicleTopSpeed: 0,
            VehicleBraking: 0,
            VehicleAcceleration: 0,
            VehicleSuspension: 0,
            VehicleHandling: 0,
        },
        SearchInput: "",
        IsSearching: false,
        ShowFeedback: false,
        Feedbacks: [
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                stars: 4,
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                stars: 2,
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                stars: 3,
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                stars: 4,
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                stars: 1,
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
        ],
        VehicleStatisticMaxValues: {
            MaxSpeed: 500,
            MaxBrake: 300,
            MaxAcceleration: 250,
            MaxSuspension: 400,
            MaxHandling: 100
        },

        // Boss menu Variables
        CompanyMoney: 10000,
        BossmenuCategory: [
            {name: 'dashboard', label: 'Dashboard'}, 
            {name: 'company', label: 'Company'}, 
            {name: 'categories', label: 'Categories'}, 
            {name: 'vehicles', label: 'Vehicles'}, 
            {name: 'employees', label: 'Employees'}, 
            {name: 'chat', label: 'Chat'}, 
            {name: 'feedbackcomplains', label: 'Feedback & Complains'}, 
            {name: 'secondhand', label: 'Second Hand Company'}
        ],
        SelectedBossmenuCategory: 0,
        Preorders: [
            {
                identifier: "",
                requestor: "Oph3Z Test",
                vehiclehash: "t20",
                vehiclemodel: "T20",
                price: 10000000
            },
        ],
        EmployeesTable: [
            {
                identifier: "",
                name: "Oph3Z Test",
                pp: "",
                perm: "Worker",
                salary: 1000,
                salarypenalty: 0
            }
        ],
        SoldVehiclesLog: [
            {
                buyer: 'Oph3Z Sane',
                vehicle: "T20",
                price: 1000000,
                date: '05.07.2024 | 16:25'
            },
        ],
        BossmenuPageSettings: {
            PreorderPage: 1,
            SoldVehiclesPage: 1,
        },

        // Notify
        NotifySettings: {
            Show: false,
            Type: 'success', // success, information, error
            Message: '',
            Time: 0,
        },

        // Popup Settings
        ShowPopupScrren: false,
        NormalPopupSettings: {
            Show: false,
            HeaderOne: '',
            HeaderTwo: '',
            Description: '',
            Function: null
        },
        FeedbackPopupSettings: {
            Show: false,
            Rating: null,
            Message: '',
        },
        ComplaintPopupSettings: {
            Show: false,
            Message: '',
        },

        // Detailed Variables
        CheckProfanities: true,
        Profanities: [
            "oç",
            "oc",
            "amk",
            "aq",
        ],
        FeedbackCharacters: {
            MinimumCharacter: 50,
            MaximumCharacter: 150,
        },
        ComplaintCharacters: {
            MinimumCharacter: 50,
            MaximumCharacter: 150,
        },

        // Tables
        ComplainTable: [
            {
                name: "Oph3Z Test",
                pfp: "./img/background.png",
                message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At assumenda praesentium in similique commodi nihil ut debitis, consequatur consectetur possimus dolor fugit quo quae dolorem reprehenderit vel sapiente. Pariatur voluptas, natus ex tempora cumque quidem ipsam, laborum possimus, nihil culpa minima sapiente dolorem beatae libero totam! Excepturi illum, necessitatibus deleniti laboriosam hic quidem id fugiat perspiciatis est fuga dolor sunt quod beatae ut. Quod voluptate culpa, veritatis praesentium nobis nostrum."
            },
        ],

        Inputs: {
            SoldVehiclesInput: ''
        },

        // Language
        Language: {
            // UI (Vehicleshop)
            ['vehicle_setup_and_information']: "Vehicle Information & Setup",
            ['price']: "Price",
            ['buy_this_car']: "Buy this car",
            ['test_drive']: "Test Drive",
            ['preview']: "Preview",
            ['change_plate']: "Change Plate",
            ['colors']: "Colors",
            ['color_settings']: "Color Settings",
            ['color_hex']: "Color Hex",
            ['change_color']: "Change Color",
            ['search']: "Search",
            ['type']: "Type",
            ['car_list']: "Car List",
            ['stock']: "Stock",
            ['kits']: "Kits",
            ['top_speed']: "Top Speed",
            ['braking']: "Braking",
            ['acceleration']: "Acceleration",
            ['suspension']: "Suspension",
            ['handling']: "Handling",
            ['exit_preview']: "Exit Preview",
            ['inspect_exterior']: "Inspect Exterior",
            ['inspect_interior']: "Inspect Interior",
            ['preview_mode_information_text']: "Rotate the car for better view!",
            ['are_you_sure']: "Are You Sure?",
            ['leave_us_a_feedback']: "Leave Us a Feedback!",
            ['feedback_description']: "Thanks for choosing us. If you want to leave a feedback we would love to!",
            ['confirm']: "Confirm",
            ['cancel']: "Cancel",
            ['close']: "Close",
            ['words']: "Words",
            ['complaint_header']: "Let us know your complaint!",
            ['complaint_description']: "Let us know your complaint so we can fix ourselves.",

            // UI (Boss menu)
            ['vehicle_stock_list']: "Stock of vehicles in your company",
            ['company_money']: "Company Money",
            ['available']: "Available",
            ['menu']: "Menu",
            ['dashboard']: "Dashboard",
            ['number_of_employeer']: "Number Of Employees",
            ['employee']: "Employee",
            ['vehicles_in_stock']: "Vehicles In Stock",
            ['vehicle']: "Vehicle",
            ['vehicles_sold']: "Number of Vehicles Sold",
            ['company_rating']: "Company rating",
            ['average']: "Average",
            ['bad']: "Bad",
            ['good']: "Good",
            ['preorder']: "Pre-order",
            ['preorder_description']: "If you accept, the vehicle will be automatically sent to the customer.",
            ['ordered_by']: "Ordered By",
            ['ordered_model']: "Ordered Model",
            ['decline']: "Decline",
            ['accept']: "Accept",
            ['preorder_second_description']: "You can change the page by right/left clicking.",
            ['sold_vehicles']: "Sold Vehicles",
            ['sold_vehicles_description']: "List of sold vehicles in your company.",
            ['buyer']: "Buyer",
            ['purchased_model']: "Purchased Model",
            ['date']: "Date",

            // UI Inputs (Placeholders)
            ['feedback_input_placeholder']: "Min 50 characters & Max 150 characters.",
            ['complaint_input_placeholder']: "Min 50 characters & Max 150 characters.",
            ['search_input_placeholder']: "Name, Label, Model Search...",
            ['bossmenu_search_input']: "Search...",

            // UI Notify
            ['successful']: "Successful",
            ['information']: "Information",
            ['error']: "Error",
            ['choose_point']: "First choose how many points you want to give to this company!",
            ['feedback_stop_using_bad_words']: "If you want to give feedback, do it properly, without bad words. Be human!",
            ['feedback_minimum_character']: "You have to write at least 50 words!",
            ['feedback_maximum_character']: "You can't write more than 150 words!",
            ['complaint_stop_using_bad_words']: "If you want to complain, do it properly, without bad words. Be human!",
            ['complaint_minimum_character']: "You have to write at least 50 words!",
            ['complaint_maximum_character']: "You can't write more than 150 words!"
        }
    }),

    methods: {
        setActivePage(page) {
            this.activePage = page
        },

        FormatMoney(s) {
            return FormatMoney(s)
        },

        BuyVehicle() {
            // Buy Vehicle Codes
        },

        TestDrive() {
            // Test Drive Codes
        },

        SetColorPicker() {
            this.ShowColorPicker = !this.ShowColorPicker

            if (this.ShowPlateChange) {
                this.ShowPlateChange = false
                this.PlateInput = ""
            }

            if (this.ShowColorPicker) {
                this.OpenColorPicker()
            }
        },

        OpenColorPicker() {
            this.$nextTick(() => {
                const colorPicker = new iro.ColorPicker("#color-picker", {
                    width: 160,
                    color: this.ColorPickerColor,
                    layout: [
                        {
                            component: iro.ui.Wheel,
                            options: {}
                        }
                    ]
                });
                colorPicker.on('color:change', (color) => {
                    this.ColorPickerColor = color.hexString;
                });
            });
        },

        ChangePlateStatus() {
            this.ShowPlateChange = !this.ShowPlateChange

            if (this.ShowColorPicker) {
                this.ShowColorPicker = false
            }

            if (!this.ShowPlateChange) {
                if (this.PlateInput.length >= 6) {
                    // Change Plate Functions
                }
            }
        },

        SelectVehicle(index, v) {
            if (this.SelectedVehicleTable.VehicleIndex != index && v.stock > 0) {
                this.SelectedVehicleTable.VehicleIndex = index
                this.SelectedVehicleTable.VehicleLabel = v.label
                this.SelectedVehicleTable.VehicleModel = v.model
                this.SelectedVehicleTable.VehiclePrice = v.price
                this.SelectedVehicleTable.VehicleTopSpeed = v.information.TopSpeed
                this.SelectedVehicleTable.VehicleBraking = v.information.Braking
                this.SelectedVehicleTable.VehicleAcceleration = v.information.Acceleration
                this.SelectedVehicleTable.VehicleSuspension = v.information.Suspension
                this.SelectedVehicleTable.VehicleHandling = v.information.Handling
            } 
        },

        ShowMoreCar(type) {
            const div = this.$refs.vc
            if (type == 'left') {
                div.scrollBy({ left: -window.innerWidth * 1.7, behavior: 'smooth' })
            } else if (type == 'right') {
                div.scrollBy({ left: window.innerWidth * 1.7, behavior: 'smooth' })
            }
        },

        Searching() {
            if (this.SearchInput != '') {
                this.IsSearching = true
            } else {
                this.IsSearching = false
            }
        },

        OpenFeedbacks() {
            this.ShowFeedback = !this.ShowFeedback

            if (this.ShowFeedback) {
                this.$nextTick(() => {
                    const divs = this.$refs.FeedbackScrollContainer
                    if (divs) {
                        divs.forEach(div => {
                            div.addEventListener('wheel', this.HandleFeedbackScroll)
                        });
                    }
                });
            } else {
                const divs = this.$refs.FeedbackScrollContainer
                if (divs) {
                    divs.forEach(div => {
                        div.removeEventListener('wheel', this.HandleFeedbackScroll)
                    });
                }
            }
        },

        HandleFeedbackScroll(event) {
            event.preventDefault();
            event.currentTarget.scrollBy({
                top: event.deltaY * 0.2,
                behavior: 'smooth'
            });
        },

        CalculateVehicleStatistic(type) {
            return CalculateVehicleStatistic(type, this.SelectedVehicleTable, this.VehicleStatisticMaxValues)
        },

        InspectExterior() {
            // Code
        },

        InspectInterior() {
            // Code
        },

        ShowNotify(type, text, ms) {
            ShowNotify(type, text, ms, this.NotifySettings, SoundPlayer)
        },

        ShowPopup(type, headerone, headertwo, description, fnc) {
            this.ShowPopupScrren = true
            if (type == 'normal') {
                this.NormalPopupSettings.Show = true
                this.NormalPopupSettings.HeaderOne = headerone
                this.NormalPopupSettings.HeaderTwo = headertwo
                this.NormalPopupSettings.Description = description
                this.NormalPopupSettings.Function = fnc
            }
        },

        ClosePopup(type) {
            this.ShowPopupScrren = false
            if (type == 'normal') {
                this.NormalPopupSettings.Show = false
                this.NormalPopupSettings.HeaderOne = ''
                this.NormalPopupSettings.HeaderTwo = ''
                this.NormalPopupSettings.Description = ''
                this.NormalPopupSettings.Function = null
            } else if (type == 'feedback') {
                this.FeedbackPopupSettings.Show = false
                this.FeedbackPopupSettings.Rating = null
                this.FeedbackPopupSettings.Message = ''
                // postNUI('CloseUI')
            } else if (type == 'complaint') {
                this.ComplaintPopupSettings.Show = false
                this.ComplaintPopupSettings.Message = ''
                // postNUI('CloseUI')
            }
        },

        SendFeedback() {
            if (this.FeedbackPopupSettings.Rating) {
                if (this.FeedbackPopupSettings.Message.length >= this.FeedbackCharacters.MinimumCharacter) {
                    if (this.FeedbackPopupSettings.Message.length <= this.FeedbackCharacters.MaximumCharacter) {
                        if (this.CheckProfanities) {
                            const SearchProfanities = this.Profanities.filter(v => this.FeedbackPopupSettings.Message.includes(v))
                            if (SearchProfanities.length == 0) {
                                // Table Insert (this.Feedbacks)
                            } else {
                                this.ShowNotify('error', this.Language['feedback_stop_using_bad_words'], 8000)
                            }
                        } else {
                            // Table Insert (this.Feedbacks)
                        }
                    } else {
                        this.ShowNotify('error', this.Language['feedback_maximum_character'], 4000)
                    }
                } else {
                    this.ShowNotify('error', this.Language['feedback_minimum_character'], 4000)
                }
            } else {
                this.ShowNotify('error', this.Language['choose_point'], 4000)
            }
        },

        SendComplaint() {
            if (this.ComplaintPopupSettings.Message.length >= this.ComplaintCharacters.MinimumCharacter) {
                if (this.ComplaintPopupSettings.Message.length <= this.ComplaintCharacters.MaximumCharacter) {
                    if (this.CheckProfanities) {
                        const SearchProfanities = this.Profanities.filter(v => this.ComplaintPopupSettings.Message.includes(v))
                        if (SearchProfanities.length == 0) {
                            // Table Insert (this.ComplainTable)
                        } else {
                            this.ShowNotify('error', this.Language['complaint_stop_using_bad_words'], 8000)
                        }
                    } else {
                        // Table Insert (this.ComplainTable)
                    }
                } else {
                    this.ShowNotify('error', this.Language['complaint_maximum_character'], 4000)
                }
            } else {
                this.ShowNotify('error', this.Language['complaint_minimum_character'], 4000)
            }
        },

        TotalBossmenuPages(type) {
            if (type == 'preorder') {
                return Math.ceil(this.Preorders.length / 7)
            } else if (type == 'soldvehicles') {
                return Math.ceil(this.FilterSoldVehiclesPage.length / 7)  
            }
        },

        NextPage(type) {
            if (type == 'preorder') {
                if (this.BossmenuPageSettings.PreorderPage < this.TotalBossmenuPages('preorder')) {
                    this.BossmenuPageSettings.PreorderPage++
                }
            } else if (type == 'soldvehicles') {
                if (this.BossmenuPageSettings.SoldVehiclesPage < this.TotalBossmenuPages('soldvehicles')) {
                    this.BossmenuPageSettings.SoldVehiclesPage++
                }
            }
        },

        PrevPage(type) {
            if (type == 'preorder') {
                if (this.BossmenuPageSettings.PreorderPage > 1) {
                    this.BossmenuPageSettings.PreorderPage--
                }
            } else if (type == 'soldvehicles') {
                if (this.BossmenuPageSettings.SoldVehiclesPage > 1) {
                    this.BossmenuPageSettings.SoldVehiclesPage--
                }
            }
        },
    },  
    
    computed: {
        FilterVehicles() {
            let x = this.VehiclesTable

            if (this.SelectedVehicleCategory !== 'all') {
                x = x.filter(v => v.category == this.SelectedVehicleCategory)
            }

            if (this.IsSearching && this.SearchInput != '') {
                return x.filter(v => v.name.toLowerCase().includes(this.SearchInput.toLowerCase()) || v.label.toLowerCase().includes(this.SearchInput.toLowerCase()) || v.model.toLowerCase().includes(this.SearchInput.toLowerCase()))
            }

            return x
        },

        NotifyColor() {
            switch (this.NotifySettings.Type) {
                case 'success':
                  return '#00F0FF';
                case 'information':
                  return '#00FFB7';
                case 'error':
                  return '#FF0004';
                default:
                  return '';
            }
        },

        AvailableVehiclesCount() {
            return this.VehiclesTable.filter(v => v.stock > 0).length;
        },

        AverageRating() {
            const rating = this.Feedbacks.reduce((k, v) => k + v.stars, 0);
            return (rating / this.Feedbacks.length).toFixed(1);
        },

        PreordersPage() {
            const s = (this.BossmenuPageSettings.PreorderPage - 1) * 7
            const e = s + 7
            return this.Preorders.slice(s, e)
        },

        FilterSoldVehiclesPage() {
            if (!this.Inputs.SoldVehiclesInput) {
                return this.SoldVehiclesLog
            } 
            return this.SoldVehiclesLog.filter(v => {
                return (
                    v.buyer.toLowerCase().includes(this.Inputs.SoldVehiclesInput.toLowerCase()) ||
                    v.vehicle.toLowerCase().includes(this.Inputs.SoldVehiclesInput.toLowerCase()) ||
                    v.price.toString().includes(this.Inputs.SoldVehiclesInput)
                )
            })
        },

        SoldVehiclesPage() {
            const s = (this.BossmenuPageSettings.SoldVehiclesPage - 1) * 7
            const e = s + 7
            return this.FilterSoldVehiclesPage.slice(s, e)
        },
    },

    watch: {
        'Inputs.SoldVehiclesInput'() {
            this.BossmenuPageSettings.SoldVehiclesPage = 1;
        }
    },

    beforeDestroy() {
        window.removeEventListener('keyup', this.onKeyUp);
    },
    
    mounted() {
        window.addEventListener("message", event => {
            const data = event.data;
            
            if (data.action == 'OpenUI') {
                // Content
            }
        });
        
        window.addEventListener('keydown', (event) => {
            if (event.key == 'Escape') {
                if (this.Show) {
                    postNUI('CloseUI')
                }
                if (this.ShowPlateChange) {
                    this.ShowPlateChange = false
                    this.PlateInput = ""
                }
            } 
        });
    },
});

app.component('inlinesvg', inlinesvg);

app.use(store).mount("#app");

const resourceName = window.GetParentResourceName ? window.GetParentResourceName() : "real-vehicleshop";

window.postNUI = async (name, data) => {
    try {
        const response = await fetch(`https://${resourceName}/${name}`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        return !response.ok ? null : response.json();
    } catch (error) {
        // console.log(error)
    }
};

let audioPlayer = null;
function SoundPlayer(val) {
    let audioPath = `./sounds/${val}`;
    audioPlayer = new Howl({
        src: [audioPath]
    });
    audioPlayer.volume(0.6);
    audioPlayer.play();
}