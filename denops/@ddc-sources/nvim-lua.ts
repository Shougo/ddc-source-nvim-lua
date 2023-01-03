import {
  BaseSource,
  Context,
  DdcOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v3.4.0/types.ts";
import { Denops, fn } from "https://deno.land/x/ddc_vim@v3.4.0/deps.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  override async gather(args: {
    denops: Denops;
    context: Context;
    options: DdcOptions;
    sourceOptions: SourceOptions;
    completeStr: string;
  }): Promise<Item[]> {
    let results: string[] = [];

    try {
      results = await fn.getcompletion(
        args.denops,
        "lua " + args.context.input,
        "cmdline",
      ) as string[];
    } catch (_) {
      // Ignore errors
      //console.log(_);
    }

    if (results.length == 0) {
      return [];
    }

    let prefix = results[0].toLowerCase();
    results.forEach((word) => {
      while (!word.toLowerCase().startsWith(prefix)) {
        prefix = prefix.slice(0, -1);
      }
    });

    const input = args.context.input.toLowerCase();
    while (!input.endsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
    if (prefix != "" && prefix != args.completeStr) {
      prefix = prefix.substring(args.completeStr.length);
      results = results.map((word) => word.substring(prefix.length));
    }
    return results.map(
      ( word ) => (word.endsWith("/")
        ? { word: word.slice(0, -1), abbr: word }
        : { word }),
    );
  }

  override params(): Params {
    return {};
  }
}
