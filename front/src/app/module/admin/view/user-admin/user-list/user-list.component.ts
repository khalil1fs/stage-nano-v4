import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../controller/model/User.model";
import {UserService} from "../../../../../controller/service/User.service";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContent} from "../../../../../components/modal/modal.component";
import {AddNotificationComponent} from "../add-notification/add-notification.component";
import {ViewUserDetailtComponent} from "../view-user-detailt/view-user-detailt.component";
import {BlockUserComponent} from "../block-user/block-user.component";
import {GlobalNotificationComponent} from "../globalNotification/global-notification.component";
// import {NotificationGlobalComponent} from "../notification-global/notification-global.component";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    crud = new Array<User>();
    searchInput: string;
    cols: any[];

    constructor(private router: Router, private userService: UserService
            ,private modalService: NgbModal    ) {
    }

    open(user: User) {
        const modalRef = this.modalService.open(AddNotificationComponent, { size: 'lg' });
        modalRef.componentInstance.name = 'khalil';
        modalRef.componentInstance.user = user;
    }

    view(user: User) {
        const modalRef = this.modalService.open(ViewUserDetailtComponent,{size: 'lg'});
        modalRef.componentInstance.user = user;
    }

    ngOnInit(): void {
        this.userService.findAll();
        this.users;
        this.isAdmin;

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

    }

    delete(user: any) {

    }

    get users(): Array<User>{
        return this.userService.users.reverse();
    }

    set users(value: User[]){
     this.userService.users = value;
    }


    search(index: string) {
        this.crud = this.users;
        let serchuser: User[] = [];
        if (index && index != '') {
            for (let user of this.users) {
                if (user.nom?.toLowerCase().search(index.toLowerCase()) != -1
                    || user.email.toLowerCase().search(index.toLowerCase()) != -1
                    || user.phone.toLowerCase().search(index.toLowerCase()) != -1
                    || user.username?.toLowerCase().search(index.toLowerCase()) != -1
                    || user.createdAt?.toString().search(index.toLowerCase()) != -1
                ) {
                    serchuser.push(user);
                }
            }
            console.log(serchuser);

            this.users = serchuser.slice();
        }
    }
    // public findAll(){
    //     this.userService.findAll().subscribe(data =>{
    //         this.users = data;
    //         this.crud = data;
    //         console.log(data);
    //     })
    // }
//     customers: Customer[];
//
//     selectedCustomers: Customer[];
//
//     representatives: Representative[];
//
//     statuses: any[];
//
//     loading: boolean = true;
//
//     activityValues: number[] = [0, 100];
//
//     constructor(private customerService: CustomerService) { }
//
//     ngOnInit() {
//         this.customerService.getCustomersLarge().then(customers => {
//             this.customers = customers;
//             this.loading = false;
//
//             // @ts-ignore
//             this.customers.forEach(customer => customer.date = new Date(customer.date));
//         });
//
//         this.representatives = [
//             {name: "Amy Elsner", image: 'amyelsner.png'},
//             {name: "Anna Fali", image: 'annafali.png'},
//             {name: "Asiya Javayant", image: 'asiyajavayant.png'},
//             {name: "Bernardo Dominic", image: 'bernardodominic.png'},
//             {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
//             {name: "Ioni Bowcher", image: 'ionibowcher.png'},
//             {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
//             {name: "Onyama Limba", image: 'onyamalimba.png'},
//             {name: "Stephen Shaw", image: 'stephenshaw.png'},
//             {name: "Xuxue Feng", image: 'xuxuefeng.png'}
//         ];
//
//         this.statuses = [
//             {label: 'Unqualified', value: 'unqualified'},
//             {label: 'Qualified', value: 'qualified'},
//             {label: 'New', value: 'new'},
//             {label: 'Negotiation', value: 'negotiation'},
//             {label: 'Renewal', value: 'renewal'},
//             {label: 'Proposal', value: 'proposal'}
//         ]
//     }
//

    get isAdmin(): boolean{
        if(this.router.url.search('admin') > -1) {
            return true;
        }
        else
            return false;
    }


    blockUnblock(user: User) {
        const modalRef = this.modalService.open(BlockUserComponent,{size: 'lg'});
        modalRef.componentInstance.user = user;
    }

    openPopUp() {
        const modalRef = this.modalService.open(GlobalNotificationComponent,{size: 'lg'});
    }
}
