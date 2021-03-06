import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {IUser} from "../../model/IUser";

@Component({
    selector: 'app-management-user',
    templateUrl: './management-user.component.html',
    styleUrls: ['./management-user.component.scss']
})
export class ManagementUserComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['id', 'username', 'roles', 'option', 'history'];
    filteredListUsers = new MatTableDataSource<any>([]);
    searchKey: string;


    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll() {
        this.userService.getAllUser().subscribe(list => {
                this.filteredListUsers.data = list;
                this.filteredListUsers.paginator = this.paginator;
                this.filteredListUsers.sort = this.sort;
            }
        )
    }

    onSearchClear() {
        this.searchKey = "";
        this.applyFilter();
    }

    applyFilter() {
        this.filteredListUsers.filter = this.searchKey.trim().toLowerCase();
    }

    updateRole(id: any) {
        if (confirm("Are you sure want to upgrade")) {
            this.userService.updateRoleAdminUser(id).subscribe(res => {
                },
                () => {
                },
                () => this.getAll()
            )
            this.getAll();
        }
    }

    goHistoryExam(id: any) {
        this.router.navigate([`admin/management-user/${id}`]);
    }

    checkRoleAdmin(element: any): boolean {
        for (const e of element) {
            if (e.name == 'ROLE_ADMIN') {
                return true;
            }
        }
        return false;
    };

    checkRoleUser(element: any): boolean {
        for (const e of element) {
            if (e.name == 'ROLE_USER') {
                return true;
            }
        }
        return false;
    }
}
