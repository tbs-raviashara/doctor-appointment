import { NgModule } from "@angular/core";
import { FilterPipe } from "./filter/filter.pipe";
import { FormatDatePipe } from "./format-date/format-date.pipe";
@NgModule({
  declarations: [FilterPipe, FormatDatePipe],
  imports: [],
  exports: [FilterPipe, FormatDatePipe]
})
export class PipesModule {}
