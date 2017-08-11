import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { NgForm } from '@angular/forms';
import { Item } from '../inventory.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor( private inventoryService: InventoryService) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    const name = form.value.itemName;
    const cost = form.value.cost;
    const purchaseDate = form.value.purchaseDate;
    const serialNum = form.value.serialNum;
    const category = form.value.category;
    const comments = form.value.comments;
    const totalItems = form.value.totalItems;
    const currency = form.value.currency;

    const item: Item = new Item(serialNum,name,cost,totalItems,purchaseDate,category,currency,comments);
    this.inventoryService.addItem(item);
    form.reset();
  }

}
