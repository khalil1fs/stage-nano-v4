import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../controller/service/User.service";
import {Router} from "@angular/router";
import {User} from "../../../../../controller/model/User.model";
import {BlockUserComponent} from "../../user-admin/block-user/block-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-gerant-list',
    templateUrl: './gerant-list.component.html',
    styleUrls: ['./gerant-list.component.css']
})
export class GerantListComponent implements OnInit {
    users: User[];
    constructor(private userService: UserService,private router: Router, private modalService: NgbModal ) {
    }

    ngOnInit(): void {
        this.findAll();
    }

    delete(user: User) {
        // var confirm = window.confirm("vous voulez vraiment suprimer  ?")
        // if (confirm) {
        //     this.userService.delete(user.nom).subscribe(
        //         data => {
        //             console.log(data);
        //             this.findAll();
        //             console.log('deleted successfully');
        //         }
        //     )
        // }
    }

    edit(user: User) {
        // this.userService.selectedUser = user;
        // this.router.navigate(['/admin/gerant-edit'])
        // this.formationService.edit().subscribe( data => {
        //     formation = this.selectedFormation;
        //
        // })
    }
    add() {
        this.router.navigate(['/admin/gerant-add'])
        this.findAll();
    }

    public findAll(){
        this.userService.findAllGerant().subscribe(data => {
            this.users = data;
            console.log(data);
        },error => {
            console.log(error);
            });
    }

    blockUnblock(user: User) {
        const modalRef = this.modalService.open(BlockUserComponent,{size: 'lg'});
        modalRef.componentInstance.user = user;
    }

}

