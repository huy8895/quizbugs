import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MessageService} from "../../../service/message.service";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    listCategories = new MatTableDataSource<any>([]);
    displayedColumns = ['id', 'category', 'option'];
    searchKey: string;

    constructor(private categoryService: CategoryService,
                private router: Router,
                private messageService: MessageService,) {
    }

    ngOnInit(): void {
        this.getAll()
    }

    onSearchClear() {
        this.searchKey = "";
        this.applyFilter();
    }

    applyFilter() {
        this.listCategories.filter = this.searchKey.trim().toLowerCase();
    }

    getAll() {
        this.categoryService.getAllCategories().subscribe(list => {
                this.listCategories.data = list;
                this.listCategories.paginator = this.paginator;
                this.listCategories.sort = this.sort;
            }
        )
    }

    delete(id) {
        if (confirm("Are you sure want to delete?")) {
            this.categoryService.delete(id).subscribe(res => {
                this.messageService.openSnackBar('Delete success','Close')
                },
                () => {
                    this.messageService.showError('Delete false')

                },
                () => this.getAll()
            )
            this.getAll();
        }
    }

    clickEdit(id) {
        this.router.navigate(['admin/categories/edit/' + id]);
    }

    add() {
        this.router.navigate(['admin/categories/add']);
    }

    cancel() {
        this.router.navigate(['admin/categories/list']);
    }
}
