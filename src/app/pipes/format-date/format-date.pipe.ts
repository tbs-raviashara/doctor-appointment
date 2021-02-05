import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "formatDate"
})
export class FormatDatePipe implements PipeTransform {
  transform(date: any, format: any) {
    return moment(date).format(format);
  }
}
